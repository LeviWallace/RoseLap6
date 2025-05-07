import json
import boto3
import uuid
import numpy as np
import os
import time
import math
from scipy.interpolate import interp1d
from datetime import datetime, timezone
from decimal import Decimal

dynamodb = boto3.resource('dynamodb', region_name='us-east-1')

track_table = dynamodb.Table("Track-nxbm7lb2srcidguvzbwydc5jqi-NONE")
vehicle_table = dynamodb.Table("Vehicle-nxbm7lb2srcidguvzbwydc5jqi-NONE")

transmission_table = dynamodb.Table("Transmission-nxbm7lb2srcidguvzbwydc5jqi-NONE")
aerodynamics_table = dynamodb.Table("Aerodynamics-nxbm7lb2srcidguvzbwydc5jqi-NONE")
brakes_table = dynamodb.Table("Brakes-nxbm7lb2srcidguvzbwydc5jqi-NONE")
engine_table = dynamodb.Table("Engine-nxbm7lb2srcidguvzbwydc5jqi-NONE")
tire_table = dynamodb.Table("Tire-nxbm7lb2srcidguvzbwydc5jqi-NONE")

simulation_table = dynamodb.Table("Simulation-nxbm7lb2srcidguvzbwydc5jqi-NONE")


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
    fetch_time = time.time()

    simulation_id = event['arguments']['id']

    simulation = load_table(simulation_table, simulation_id)
    if not simulation:
        return {
            "statusCode": 404,
            "error": "Cannot load simulation",
            "body": json.dumps({"simulation": simulation})
        }
    
    vehicle_id = simulation['vehicle']
    track_id = simulation['track']

    vehicle = load_table(vehicle_table, vehicle_id)
    track = load_table(track_table, track_id)

    if not vehicle or not track:
        return {
            "statusCode": 404,
            "error": "Cannot load either vehicle or track",
            "body": json.dumps(simulation)
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

    fetch_time = time.time() - fetch_time

    calculation_time = time.time()
    simulation_props = calculate_vehicle_model(vehicle, brakes, tire, transmission, aerodynamics, engine)
    calculation_time = time.time() - calculation_time

    simulation_table.update_item(
        Key={
            'id': simulation_id
        },
        UpdateExpression="SET tFetchTime = :tFetchTime, tBrakeModel = :tBrakeModel, tSteeringModel = :tSteeringModel, tDrivelineModel = :tDrivelineModel, tShiftingModel = :tShiftingModel, tForceModel = :tForceModel, tGGVMapModel = :tGGVMapModel, tSimulationTime = :tSimulationTime, completed = :completed, engineSpeedCurve = :engineSpeedCurve, engineTorqueCurve = :engineTorqueCurve, enginePowerCurve = :enginePowerCurve, vehicleSpeed = :vehicleSpeed, engineSpeed = :engineSpeed, gear = :gear, fxEngine = :fxEngine",
        ExpressionAttributeValues={
            ":tFetchTime": Decimal(str(fetch_time)),
            ":tBrakeModel": Decimal(str(simulation_props["tBrakeModel"])),
            ":tSteeringModel": Decimal(str(simulation_props["tSteeringModel"])),
            ":tDrivelineModel": Decimal(str(simulation_props["tDrivelineModel"])),
            ":tShiftingModel": Decimal(str(simulation_props["tShiftingModel"])),
            ":tForceModel": Decimal(str(simulation_props["tForceModel"])),
            ":tGGVMapModel": Decimal(str(simulation_props["tGGVMapModel"])),
            ":tSimulationTime": Decimal(str(calculation_time)),
            ":completed": True,
            ":engineSpeedCurve": [Decimal(str(v)) for v in simulation_props["engineSpeedCurve"]],
            ":engineTorqueCurve": [Decimal(str(v)) for v in simulation_props["engineTorqueCurve"]],
            ":enginePowerCurve": [Decimal(str(v)) for v in simulation_props["enginePowerCurve"]],
            ":vehicleSpeed": [Decimal(str(v)) for v in simulation_props["vehicleSpeed"]],
            ":engineSpeed": [Decimal(str(v)) for v in simulation_props["engineSpeed"]],
            ":gear": [Decimal(str(v)) for v in simulation_props["gear"]],
            ":fxEngine": [Decimal(str(v)) for v in simulation_props["fxEngine"]]
        }
    )

    return json.dumps({
        "statusCode": 200,
        "message": "Simulation completed successfully",
        "simulation": simulation_props
    })


### VEHICLE
def calculate_vehicle_model(vehicle, brakes, tire, transmission, aerodynamics, engine):
    
    # Extract vehicle parameters
    M = float(vehicle['mass'])  # Vehicle mass [kg]
    df = float(vehicle['frontMassDistribution'])  # Front axle weight distribution [-]
    torque_curves = vehicle['torqueCurves']
    en_speed_curve = np.array([float(curve['engineSpeed']) for curve in torque_curves])  # [rpm]
    en_torque_curve = np.array([float(curve['torque']) for curve in torque_curves])  # [N*m]

    # Brakes
    br_disc_d = float(brakes['discOuterDiameter'])/1000
    br_pad_h = float(brakes['padHeight'])/1000
    br_pad_mu = float(brakes['padFrictionCoefficient'])
    br_nop = float(brakes['caliperNumberOfPistons'])
    br_pist_d = float(brakes['caliperPistonDiameter'])
    br_mast_d = float(brakes['masterCylinderPistonDiameter'])
    br_ped_r = float(brakes['pedalRatio'])


    # Transmission
    drive = transmission['driveType']
    ratio_primary = float(transmission['primaryGearReduction'])
    ratio_final = float(transmission['finalGearReduction'])
    ratio_gearbox = np.array([float(ratio) for ratio in transmission['gearRatios']])
    n_primary = float(transmission['primaryGearEfficiency'])
    n_gearbox = float(transmission['gearboxEfficiency'])
    n_final = float(transmission['finalGearEfficiency'])
    

    # Aerodynamics
    Cl = float(aerodynamics['liftCoefficientCL'])
    Cd = float(aerodynamics['dragCoefficientCD'])
    factor_Cl = float(aerodynamics['clScaleMultiplier'])
    factor_Cd = float(aerodynamics['cdScaleMultiplier'])  # Lift coefficient [-]
    da = float(aerodynamics['frontAeroDistribution'])/100  # Front area [m^2]
    A = float(aerodynamics['frontalArea'])  # Frontal area [m^2]
    rho = float(aerodynamics['airDensity'])  # Air density [kg/m^3]

    # Tire
    L = float(tire['wheelBase'])    # Wheelbase [m]
    factor_grip = float(tire['gripFactorMultiplier'])  # Grip factor [-]
    tire_radius = float(tire['tireRadius'])/1000
    mu_x = float(tire['longitudinalFrictionCoefficient'])  # Longitudinal friction coefficient [-]
    mu_x_M = float(tire['longitudinalFrictionLoadRating'])  # Max longitudinal friction coefficient [-]
    sens_x = float(tire['longitudinalFrictionSensitivity'])  # Longitudinal sensitivity [N/deg]
    mu_y = float(tire['lateralFrictionCoefficient'])  # Lateral friction coefficient [-]
    mu_y_M = float(tire['lateralFrictionLoadRating'])  # Max lateral friction coefficient [-]
    sens_y = float(tire['lateralFrictionSensitivity'])  # Lateral sensitivity [N/deg]
    CF = float(tire['frontCorneringStiffness'])  # Front cornering stiffness [N/deg]
    CR = float(tire['rearCorneringStiffness'])  # Rear cornering stiffness [N/deg]

    ## %% Braking Model
    brake_time = time.time()
    
    br_pist_a = br_nop * math.pi * (br_pist_d / 1000) ** 2 / 4  # [m^2]
    br_mast_a = math.pi * (br_mast_d / 1000) ** 2 / 4  # [m^2]
    beta = tire_radius / (br_disc_d / 2 - br_pad_h / 2) / br_pist_a / br_pad_mu / 4  # [Pa/N] per wheel
    phi = br_mast_a / br_ped_r * 2  # [-] for both systems

    brake_time = time.time() - brake_time

    ## %% Steering Model
    steering_time = time.time()

    # Calculate distances from center of mass
    a = (1 - df) * L  # Distance of front axle from center of mass [mm]
    b = -df * L       # Distance of rear axle from center of mass [mm]

    # Calculate steering model matrix
    C = 2 * [[CF, CF + CR], [CF * a, CF * a + CR * b]]
    

    steering_time = time.time() - steering_time
    ## %% Driveline Model
    driveline_time = time.time()

    en_power_curve = [(torque * speed * 2 * math.pi / 60) for torque, speed in zip(en_torque_curve, en_speed_curve)]  # [W]

    # Number of gears
    nog = len(ratio_gearbox)

    # Memory preallocation
    wheel_speed_gear = np.zeros((nog, len(en_speed_curve)))
    vehicle_speed_gear = np.zeros((nog, len(en_speed_curve)))
    wheel_torque_gear = np.zeros((nog, len(en_speed_curve)))

    # Calculate values for each gear and engine speed
    for i in range(nog):
        wheel_speed = en_speed_curve / ratio_primary / ratio_gearbox[i] / ratio_final
        vehicle_speed = wheel_speed * 2 * math.pi / 60 * tire_radius  # in m/s
        wheel_torque = en_torque_curve * ratio_primary * ratio_gearbox[i] * ratio_final * n_primary * n_gearbox * n_final

        # Store results
        wheel_speed_gear[i, :] = wheel_speed
        vehicle_speed_gear[i, :] = vehicle_speed
        wheel_torque_gear[i, :] = wheel_torque
    
    # Minimum and maximum vehicle speeds
    v_min = min(min(v) for v in vehicle_speed_gear)
    v_max = max(max(v) for v in vehicle_speed_gear)

    # New speed vector for coarser meshing
    dv = (7.2 / 3.6)  # [m/s]
    vehicle_speed = np.linspace(v_min, v_max, int((v_max - v_min) / dv) + 1)
    n_points = len(vehicle_speed)

    # Memory preallocation for gear and tractive force
    gear = np.zeros(n_points, dtype=int)
    fx_engine = np.zeros(n_points)
    fx = np.zeros((n_points, nog))

    # Precompute interpolators for each gear
    interpolators = [
        interp1d(vehicle_speed_gear[i], wheel_torque_gear[i] / tire_radius, 
                kind='linear', fill_value=0, bounds_error=False)
        for i in range(nog)
    ]

    # Compute tractive force and select optimal gear
    for i in range(n_points):
        v = vehicle_speed[i]
        fx_i = [interp(v) for interp in interpolators]
        fx[i, :] = fx_i
        fx_engine[i] = np.max(fx_i)
        gear[i] = np.argmax(fx_i)

    # Adding values for 0 speed to vectors for interpolation purposes at low speeds
    vehicle_speed = np.insert(vehicle_speed, 0, 0)
    gear = np.insert(gear, 0, gear[0])  # Repeat first gear
    fx_engine = np.insert(fx_engine, 0, fx_engine[0])

    # Convert gear indices to corresponding gear ratios
    gear_ratios = ratio_gearbox[gear]

    # Compute final vectors
    engine_speed = ratio_final * gear_ratios * ratio_primary * vehicle_speed / tire_radius * 60 / (2 * np.pi)  # RPM
    wheel_torque = fx_engine * tire_radius
    engine_torque = wheel_torque / (ratio_final * gear_ratios * ratio_primary * n_primary * n_gearbox * n_final)
    engine_power = engine_torque * engine_speed * 2 * np.pi / 60  # Watts

    driveline_time = time.time() - driveline_time
    # %% Shifting Points and Rev Drops
    shifting_time = time.time()

    gear_change = np.diff(gear) != 0

    # Identify indices just before and after a gear change
    gear_change_indices = np.where(np.concatenate([[False], gear_change]) | np.concatenate([gear_change, [False]]))[0]

    # Get engine speeds at those points
    engine_speed_gear_change = engine_speed[gear_change_indices]

    # Separate into shift (before) and arrive (after) points
    shift_points = engine_speed_gear_change[::2]
    arrive_points = engine_speed_gear_change[1::2]

    # Calculate rev drops
    rev_drops = shift_points - arrive_points

    # # Create row labels like '1-2', '2-3', ..., 'n-1-n'
    # rownames = [f"{i}-{i+1}" for i in range(1, len(shift_points)+1)]

    # # Create a pandas table
    # shifting = pd.DataFrame({
    #     "shift_points": shift_points,
    #     "arrive_points": arrive_points,
    #     "rev_drops": rev_drops
    # }, index=rownames)

    # HUD
    # return {
    #     "shift_points": shift_points.tolist(),
    #     "arrive_points": arrive_points.tolist(),
    #     "rev_drops": rev_drops.tolist(),
    #     "vehicle_speed": vehicle_speed.tolist(),
    # }
    
    shifting_time = time.time() - shifting_time
    # %% Force Model

    force_time = time.time()
    g = 9.81

    factor_drive = 1
    factor_aero = 1
    driven_wheels = 4

    if drive == "RearWheelDrive":
        factor_drive = (1 - df)
        factor_aero = (1 - da)
        driven_wheels = 2
    elif drive == "FrontWheelDrive":
        factor_drive = df
        factor_aero = da
        driven_wheels = 2

    # z-axis forces
    fz_mass = -M * g
    fz_aero = 0.5 * rho * factor_Cl * Cl * A * vehicle_speed**2
    fz_total = fz_mass + fz_aero
    fz_tyre = (factor_drive * fz_mass + factor_aero * fz_aero) / driven_wheels

    # x-axis forces
    fx_aero = 0.5 * rho * factor_Cd * Cd * A * vehicle_speed**2
    fx_roll = CR * abs(fz_total)
    fx_tyre = driven_wheels * (mu_x + sens_x * (mu_x_M * g - abs(fz_tyre))) * abs(fz_tyre)

    force_time = time.time() - force_time
    # % GGV Map
    ggv_time = time.time()

    # Track data
    bank = 0  # Bank angle [degrees]
    incl = 0  # Inclination angle [degrees]

    # Lateral tire coefficients
    dmy = factor_grip * sens_y
    muy = factor_grip * mu_y
    Ny = mu_y_M * g

    # Longitudinal tire coefficients
    dmx = factor_grip * sens_x
    mux = factor_grip * mu_x
    Nx = mu_x_M * g

    # Normal load on all wheels
    Wz = M * g * math.cos(bank) * math.cos(incl)

    # Induced weight from banking and inclination
    Wy = -M * g * math.sin(bank)
    Wx = M * g * math.sin(incl)

    # Speed map vector
    dv = 2  # Speed increment [m/s]
    v = np.arange(0, v_max + dv, dv)
    if v[-1] != v_max:
        v = np.append(v, v_max)

    N = 45
    # Initialize GGV map as a numpy array
    GGV = np.zeros((len(v), 2 * N - 1, 3))
    for i in range(len(v)):
        # Aero forces
        Aero_Df = 0.5 * rho * factor_Cl * Cl * A * v[i] ** 2
        Aero_Dr = 0.5 * rho * factor_Cd * Cd * A * v[i] ** 2

        # Rolling resistance
        Roll_Dr = CR * abs(-Aero_Df + Wz)

        # Normal load on driven wheels
        Wd = (factor_drive * Wz + (-factor_aero * Aero_Df)) / driven_wheels

        # Drag acceleration
        ax_drag = (Aero_Dr + Roll_Dr + Wx) / M

        # Maximum lateral acceleration available from tires
        ay_max = (1 / M) * (muy + dmy * (Ny - (Wz - Aero_Df) / 4)) * (Wz - Aero_Df)

        # Maximum longitudinal acceleration available from tires
        ax_tyre_max_acc = (1 / M) * (mux + dmx * (Nx - Wd)) * Wd * driven_wheels

        # Maximum longitudinal deceleration available from tires
        ax_tyre_max_dec = -(1 / M) * (mux + dmx * (Nx - (Wz - Aero_Df) / 4)) * (Wz - Aero_Df)

        # Getting power limit from engine
        ax_power_limit = (1 / M) * np.interp(v[i], vehicle_speed, factor_drive * fx_engine)
        ax_power_limit = np.full(N, ax_power_limit)

        # Lateral acceleration vector
        ay = ay_max * np.cos(np.radians(np.linspace(0, 180, N)))

        # Longitudinal acceleration vector
        ax_tyre_acc = ax_tyre_max_acc * np.sqrt(1 - (ay / ay_max) ** 2)  # Friction ellipse
        ax_acc = np.minimum(ax_tyre_acc, ax_power_limit) + ax_drag  # Limiting by engine power
        ax_dec = ax_tyre_max_dec * np.sqrt(1 - (ay / ay_max) ** 2) + ax_drag  # Friction ellipse

        # Saving GGV map
        GGV[i, :, 0] = np.concatenate([ax_acc, ax_dec[1:][::-1]])
        GGV[i, :, 1] = np.concatenate([ay, ay[1:][::-1]])
        GGV[i, :, 2] = v[i] * np.ones(2 * N - 1)
    # # HUD
    # print("GGV map generated successfully.")
    ggv_time = time.time() - ggv_time
    return {
        "tBrakeModel": brake_time,
        "tSteeringModel": steering_time,
        "tDrivelineModel": driveline_time,
        "tShiftingModel": shifting_time,
        "tForceModel": force_time,
        "tGGVMapModel": ggv_time,
        "engineSpeedCurve": en_speed_curve.tolist(),
        "engineTorqueCurve": en_torque_curve.tolist(),
        "enginePowerCurve": en_power_curve,
        "vehicleSpeed": vehicle_speed.tolist(),
        "engineSpeed": engine_speed.tolist(),
        "gear": gear.tolist(),
        "fxEngine": fx_engine.tolist(),
    }
