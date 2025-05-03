import json
import boto3
import math
from scipy.interpolate import interp1d

dynamodb = boto3.resource('dynamodb', region_name='us-east-1')

track_table = dynamodb.Table("Track-nxbm7lb2srcidguvzbwydc5jqi-NONE")
vehicle_table = dynamodb.Table("Vehicle-nxbm7lb2srcidguvzbwydc5jqi-NONE")

transmission_table = dynamodb.Table("Transmission-nxbm7lb2srcidguvzbwydc5jqi-NONE")
aerodynamics_table = dynamodb.Table("Aerodynamics-nxbm7lb2srcidguvzbwydc5jqi-NONE")
brakes_table = dynamodb.Table("Brakes-nxbm7lb2srcidguvzbwydc5jqi-NONE")
engine_table = dynamodb.Table("Engine-nxbm7lb2srcidguvzbwydc5jqi-NONE")
tire_table = dynamodb.Table("Tire-nxbm7lb2srcidguvzbwydc5jqi-NONE")

def handler(event, context):
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

    return calculate_driveline_model(vehicle, transmission, tire)

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

### VEHICLE

def calculate_brake_model(brakes, tire):
    try:
        # Extract brake parameters
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

        # Return calculated values
        return {
            "pistonArea": br_pist_a,
            "masterCylinderArea": br_mast_a,
            "beta": beta,
            "phi": phi
        }
    except KeyError as e:
        raise ValueError(f"Missing required brake parameter: {e}")
    except Exception as e:
        raise ValueError(f"Error calculating brake model: {e}")

def calculate_steering_model(tire, frontMassDistribution):
    # Extract steering parameters
    CF = float(tire['frontCorneringStiffness'])  # Front cornering stiffness [N/deg]
    CR = float(tire['rearCorneringStiffness'])  # Rear cornering stiffness [N/deg]
    df = float(frontMassDistribution)  # Front axle weight distribution [-]
    L = float(tire['wheelBase'])    # Wheelbase [m]

    try:
        # Calculate distances from center of mass
        a = (1 - df) * L  # Distance of front axle from center of mass [mm]
        b = -df * L       # Distance of rear axle from center of mass [mm]

        # Calculate steering model matrix
        C = 2 * [[CF, CF + CR], [CF * a, CF * a + CR * b]]

        # Return the steering model matrix
        return {
            "steeringMatrix": C,
            "message": "Steering model generated successfully."
        }
    except Exception as e:
        raise ValueError(f"Error calculating steering model: {e}")


def calculate_driveline_model(vehicle, transmission, tire):
    try:
        # Extract engine torque curve
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

        return {
            "message": "Driveline model generated successfully.",
        }

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

        # Minimum and maximum vehicle speeds
        v_min = min(min(v) for v in vehicle_speed_gear)
        v_max = max(max(v) for v in vehicle_speed_gear)

        # New speed vector for fine meshing
        dv = 0.5 / 3.6  # [m/s]
        vehicle_speed = [v_min + i * dv for i in range(int((v_max - v_min) / dv) + 1)]

        # Memory preallocation for gear and tractive force
        gear = []
        fx_engine = []

        return {
            "message": "Driveline model generated successfully.",
        }

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

        return {
            "vehicleSpeed": vehicle_speed,
            "gear": gear,
            "engineSpeed": engine_speed,
            "wheelTorque": wheel_torque,
            "engineTorque": engine_torque,
            "enginePower": engine_power,
            "enginePowerCurve": en_power_curve,
            "message": "Driveline model generated successfully."
        }
    except Exception as e:
        raise ValueError(f"Error calculating driveline model: {e}")

