import json
import boto3

dynamodb = boto3.resource('dynamodb', region_name='us-east-1')

track_table = dynamodb.Table("Track-nxbm7lb2srcidguvzbwydc5jqi-NONE")
vehicle_table = dynamodb.Table("Vehicle-nxbm7lb2srcidguvzbwydc5jqi-NONE")

transmission_table = dynamodb.Tabke("Transmission-nxbm7lb2srcidguvzbwydc5jqi-NONE")
aerodynamics_table = dynamodb.Tabke("Aerodynamics-nxbm7lb2srcidguvzbwydc5jqi-NONE")
brakes_table = dynamodb.Tabke("Brakes-nxbm7lb2srcidguvzbwydc5jqi-NONE")
engine_table = dynamodb.Tabke("Engine-nxbm7lb2srcidguvzbwydc5jqi-NONE")
tire_table = dynamodb.Tabke("Tire-nxbm7lb2srcidguvzbwydc5jqi-NONE")


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
            "error": "Cannot load either vehicle or track",
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
    
    return {
        "statusCode": 200,
        "message": "success"
    }

## VEHICLE

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
