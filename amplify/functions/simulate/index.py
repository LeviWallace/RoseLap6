import json
import boto3
import uuid
import numpy as np
import time
import math
from scipy.interpolate import interp1d
from datetime import datetime, timezone

dynamodb = boto3.resource('dynamodb', region_name='us-east-1')

track_table = dynamodb.Table("Track-nxbm7lb2srcidguvzbwydc5jqi-NONE")
vehicle_table = dynamodb.Table("Vehicle-nxbm7lb2srcidguvzbwydc5jqi-NONE")

transmission_table = dynamodb.Table("Transmission-nxbm7lb2srcidguvzbwydc5jqi-NONE")
aerodynamics_table = dynamodb.Table("Aerodynamics-nxbm7lb2srcidguvzbwydc5jqi-NONE")
brakes_table = dynamodb.Table("Brakes-nxbm7lb2srcidguvzbwydc5jqi-NONE")
engine_table = dynamodb.Table("Engine-nxbm7lb2srcidguvzbwydc5jqi-NONE")
tire_table = dynamodb.Table("Tire-nxbm7lb2srcidguvzbwydc5jqi-NONE")

simulation_table = dynamodb.Table("Simulation-nxbm7lb2srcidguvzbwydc5jqi-NONE")

handler_time = None
brake_modal_time = None
steering_model_time = None
driveline_model_time = None


def load_table(table, id):
    if not id:
        return False
    
    try:
        response = table.get_item(Key={"id": id})
        item = response.get("Item")
        return item
    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"error": str(e)})
        }

def handler(event, context):
    handler_time = time.time()

    vehicle_id = event['arguments']['vehicleId']
    track_id = event['arguments']['trackId']

    vehicle = load_table(vehicle_table, vehicle_id)
    track = load_table(track_table, track_id)

    if not vehicle or not track:
        return {
            "statusCode": 404,
            "error": "Cannot load either vehicle or track",
            "body": json.dumps({
                 "vehicle": vehicle,
                 "track": track
            })
        }
    
    transmission_id = vehicle['transmissionId']
    transmission = load_table(transmission_table, transmission_id)

    aerodynamics_id = vehicle['aerodynamicsId']
    aerodynamics = load_table(aerodynamics_table, aerodynamics_id)

    brakes_id = vehicle['brakesId']
    brakes = load_table(brakes_table, brakes_id)

    engine_id = vehicle['engineId']
    engine = load_table(engine_table, engine_id)

    tire_id = vehicle['tireId']
    tire = load_table(tire_table, tire_id)
    
    if not transmission or not aerodynamics or not brakes or not engine or not tire:
        return {
            "statusCode": 404,
            "error": "Cannot load a component of the vehicle",
            "body": json.dumps({
                "vehicle": vehicle,
                "track": track,
                "transmission": transmission,
                "aerodynamics": aerodynamics,
                "brakes": brakes,
                "engine": engine,
                "tire": tire
            })
        }

    handler_time = time.time() - handler_time
    simulation_props = calculate_vehicle_model(vehicle, brakes, tire, transmission, aerodynamics, engine)

    item = {
        'id': uuid.uuid4().hex,
        'vehicle': vehicle_id,
        'track': track_id,
        'completed': False,
        'updatedAt': datetime.now(timezone.utc).isoformat().replace('+00:00', 'Z'),
        'createdAt': datetime.now(timezone.utc).isoformat().replace('+00:00', 'Z')
    }
    
    simulation_table.put_item(
        Item=item
    )

    return {
        "message": {
            "success": 1,
        }
    }


### VEHICLE
def calculate_vehicle_model(vehicle, brakes, tire, transmission, aerodynamics, engine):
    br_disc_d = float(brakes['discOuterDiameter'])
    br_pad_h = float(brakes['padHeight'])
    br_pad_mu = float(brakes['padFrictionCoefficient'])
    br_nop = float(brakes['caliperNumberOfPistons'])
    br_pist_d = float(brakes['caliperPistonDiameter'])
    br_mast_d = float(brakes['masterCylinderPistonDiameter'])
    br_ped_r = float(brakes['pedalRatio'])

    tire_radius = float(tire['tireRadius'])

    # Calculate brake parameters
    br_pist_a = br_nop * math.pi * (br_pist_d / 1000) ** 2 / 4  # [m^2]
    br_mast_a = math.pi * (br_mast_d / 1000) ** 2 / 4  # [m^2]
    beta = tire_radius / (br_disc_d / 2 - br_pad_h / 2) / br_pist_a / br_pad_mu / 4  # [Pa/N] per wheel
    phi = br_mast_a / br_ped_r * 2  # [-] for both systems

    # Extract steering parameters
    CF = float(tire['frontCorneringStiffness'])  # Front cornering stiffness [N/deg]
    CR = float(tire['rearCorneringStiffness'])  # Rear cornering stiffness [N/deg]
    df = float(vehicle['frontMassDistribution'])  # Front axle weight distribution [-]
    L = float(tire['wheelBase'])    # Wheelbase [m]

    # Calculate distances from center of mass
    a = (1 - df) * L  # Distance of front axle from center of mass [mm]
    b = -df * L       # Distance of rear axle from center of mass [mm]

    # Calculate steering model matrix
    C = 2 * [[CF, CF + CR], [CF * a, CF * a + CR * b]]

    # Return the steering model matrix
    

    # Extract engine torque curve
    driveline_model_time = time.time()
    torque_curves = vehicle['torqueCurves']
    en_speed_curve = [float(curve['engineSpeed']) for curve in torque_curves]  # [rpm]
    en_torque_curve = [float(curve['torque']) for curve in torque_curves]  # [N*m]

    # Calculate engine power curve
    en_power_curve = [torque * speed * 2 * math.pi / 60 for torque, speed in zip(en_torque_curve, en_speed_curve)]  # [W]

    # Extract transmission and tire parameters
    required_keys = ['primaryGearReduction', 'finalGearReduction', 'gearRatios', 
                        'primaryGearEfficiency', 'gearboxEfficiency', 'finalGearEfficiency']
    for key in required_keys:
        if key not in transmission:
            raise ValueError(f"Missing required transmission parameter: {key}")

    ratio_primary = float(transmission['primaryGearReduction'])
    ratio_final = float(transmission['finalGearReduction'])
    ratio_gearbox = [float(ratio) for ratio in transmission['gearRatios']]  # Gear ratios
    n_primary = float(transmission['primaryGearEfficiency'])
    n_gearbox = float(transmission['gearboxEfficiency'])
    n_final = float(transmission['finalGearEfficiency'])
    tire_radius = float(tire['tireRadius'])  # [m]


    # Number of gears
    nog = len(ratio_gearbox)

    # Memory preallocation
    wheel_speed_gear = []
    vehicle_speed_gear = []
    wheel_torque_gear = []

    # Calculate values for each gear and engine speed
    for i in range(nog):
        wheel_speed = [speed / ratio_primary / ratio_gearbox[i] / ratio_final for speed in en_speed_curve]
        vehicle_speed = [ws * 2 * math.pi / 60 * tire_radius for ws in wheel_speed]
        wheel_torque = [torque * ratio_primary * ratio_gearbox[i] * ratio_final * n_primary * n_gearbox * n_final for torque in en_torque_curve]

        wheel_speed_gear.append(wheel_speed)
        vehicle_speed_gear.append(vehicle_speed)
        wheel_torque_gear.append(wheel_torque)

    driveline_model_time = time.time() - driveline_model_time

    # Minimum and maximum vehicle speeds
    v_min = min(min(v) for v in vehicle_speed_gear)
    v_max = max(max(v) for v in vehicle_speed_gear)

    # New speed vector for coarser meshing
    dv = 5 * (7.2 / 3.6)  # [m/s]
    vehicle_speed = [v_min + i * dv for i in range(int((v_max - v_min) / dv) + 1)]

    # Memory preallocation for gear and tractive force
    gear = []
    fx_engine = []

    # Optimizing gear selection and calculating tractive force
    for v in vehicle_speed:
        fx = [interp1d(vg, [wt / tire_radius for wt in wtg], fill_value=0, bounds_error=False)(v) for vg, wtg in zip(vehicle_speed_gear, wheel_torque_gear)]
        max_fx = max(fx)
        selected_gear = fx.index(max_fx) + 1  # Gear index starts from 1
        fx_engine.append(max_fx)
        gear.append(selected_gear)

    # Adding values for 0 speed to vectors for interpolation purposes at low speeds
    vehicle_speed.insert(0, 0)
    gear.insert(0, gear[0])
    fx_engine.insert(0, fx_engine[0])

    # Final vectors
    engine_speed = [ratio_final * ratio_gearbox[g - 1] * ratio_primary * v / tire_radius * 60 / (2 * math.pi) for g, v in zip(gear, vehicle_speed)]
    wheel_torque = [fx * tire_radius for fx in fx_engine]
    engine_torque = [wt / ratio_final / ratio_gearbox[g - 1] / ratio_primary / n_primary / n_gearbox / n_final for wt, g in zip(wheel_torque, gear)]
    engine_power = [et * es * 2 * math.pi / 60 for et, es in zip(engine_torque, engine_speed)]

    # %% Shifting Points and Rev Drops

    # Finding gear changes
    gear_change = np.diff(gear)  # Gear change will appear as 1
    gear_change = np.concatenate(([0], gear_change)) + np.concatenate((gear_change, [0]))
    gear_change = gear_change.astype(bool)

    # Getting engine speed at gear change
    engine_speed_gear_change = np.array(engine_speed)[gear_change]

    # Getting shift points and arrive points
    shift_points = engine_speed_gear_change[::2]
    arrive_points = engine_speed_gear_change[1::2]

    # Calculating rev drops
    rev_drops = shift_points - arrive_points

    # Creating shifting table
    rownames = [f"{i}-{i+1}" for i in range(1, len(shift_points) + 1)]
    # TODO: OUTPUT THIS DATAFRAME
    # shifting_table = pd.DataFrame({
    #     "Shift Points": shift_points,
    #     "Arrive Points": arrive_points,
    #     "Rev Drops": rev_drops
    # }, index=rownames)

    return {
        "message": {
            "rownames": rownames,
            "shift_points": shift_points.tolist(),
            "arrive_points": arrive_points.tolist(),
            "rev_drops": rev_drops.tolist(),
            "vehicle_speed": vehicle_speed,
        }
    }

    # Add the following code:
    # # %% GGV Map
    # # Constants
    # g = 9.81  # Gravity [m/s^2]
    # rho = 1.225  # Air density [kg/m^3]
    # factor_grip = 1.0  # Grip factor
    # factor_Cl = 1.0  # Lift coefficient factor
    # factor_Cd = 1.0  # Drag coefficient factor
    # factor_power = 1.0  # Power factor
    # factor_drive = 0.5  # Drive factor
    # factor_aero = 0.5  # Aero factor
    # driven_wheels = 2  # Number of driven wheels

    # # Extract track and vehicle parameters
    # M = float(vehicle['mass'])  # Vehicle mass [kg]
    # A = float(aerodynamics['frontalArea'])  # Frontal area [m^2]
    # Cl = float(aerodynamics['liftCoefficient'])  # Lift coefficient
    # Cd = float(aerodynamics['dragCoefficient'])  # Drag coefficient
    # Cr = float(aerodynamics['rollingResistanceCoefficient'])  # Rolling resistance coefficient
    # mu_x = float(tire['longitudinalFrictionCoefficient'])  # Longitudinal friction coefficient
    # mu_y = float(tire['lateralFrictionCoefficient'])  # Lateral friction coefficient
    # sens_x = float(tire['longitudinalSensitivity'])  # Longitudinal sensitivity
    # sens_y = float(tire['lateralSensitivity'])  # Lateral sensitivity

    # # Derived parameters
    # dmx = factor_grip * sens_x
    # dmy = factor_grip * sens_y
    # mux = factor_grip * mu_x
    # muy = factor_grip * mu_y
    # Ny = mu_y * M * g
    # Nx = mu_x * M * g
    # Wz = M * g  # Normal load on all wheels [N]

    # # Speed map vector
    # dv = 2  # Speed step [m/s]
    # v = np.arange(0, v_max + dv, dv)  # Speed vector [m/s]

    # # Friction ellipse points
    # N = 45  # Number of points

    # # Map preallocation
    # GGV = np.zeros((len(v), 2 * N - 1, 3))

    # for i, speed in enumerate(v):
    #     # Aero forces
    #     Aero_Df = 0.5 * rho * factor_Cl * Cl * A * speed**2  # Downforce [N]
    #     Aero_Dr = 0.5 * rho * factor_Cd * Cd * A * speed**2  # Drag force [N]

    #     # Rolling resistance
    #     Roll_Dr = Cr * abs(-Aero_Df + Wz)  # Rolling drag [N]

    #     # Normal load on driven wheels
    #     Wd = (factor_drive * Wz + (-factor_aero * Aero_Df)) / driven_wheels

    #     # Drag acceleration
    #     ax_drag = (Aero_Dr + Roll_Dr) / M

    #     # Maximum lateral acceleration available from tires
    #     ay_max = (1 / M) * (muy + dmy * (Ny - (Wz - Aero_Df) / 4)) * (Wz - Aero_Df)

    #     # Maximum longitudinal acceleration available from tires
    #     ax_tyre_max_acc = (1 / M) * (mux + dmx * (Nx - Wd)) * Wd * driven_wheels
    #     ax_tyre_max_dec = -(1 / M) * (mux + dmx * (Nx - (Wz - Aero_Df) / 4)) * (Wz - Aero_Df)

    #     # Power limit from engine
    #     ax_power_limit = (1 / M) * interp1d(vehicle_speed, factor_power * fx_engine, fill_value=0, bounds_error=False)(speed)
    #     ax_power_limit = np.full(N, ax_power_limit)

    #     # Lateral acceleration vector
    #     ay = ay_max * np.cos(np.linspace(0, np.pi, N))

    #     # Longitudinal acceleration vectors
    #     ax_tyre_acc = ax_tyre_max_acc * np.sqrt(1 - (ay / ay_max) ** 2)  # Friction ellipse
    #     ax_acc = np.minimum(ax_tyre_acc, ax_power_limit) + ax_drag  # Limited by engine power
    #     ax_dec = ax_tyre_max_dec * np.sqrt(1 - (ay / ay_max) ** 2) + ax_drag  # Friction ellipse

    #     # Saving GGV map
    #     GGV[i, :, 0] = np.concatenate((ax_acc, ax_dec[1:]))
    #     GGV[i, :, 1] = np.concatenate((ay, -ay[1:]))
    #     GGV[i, :, 2] = speed * np.ones(2 * N - 1)

    # # HUD
    # print("GGV map generated successfully.")
