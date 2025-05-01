import json
import boto3

dynamodb = boto3.resource('dynamodb')
track = dynamodb.Table("Track")

def handler(event, context):
    vehicleId = event['arguments']['vehicleId']
    trackId = event['arguments']['trackId']

    if not vehicleId or not trackId:
        return {
            "statusCode": 400,
            "body": json.dumps({"error": "Missing either vehicleId or trackId"})
        }
    
    try:
        response = track.get_item(Key={"id": trackId})
        item = response.get("Item")
        if item:
            return {
                "statusCode": 200,
                "body": json.dumps(item)
            }
        else:
            return {
                "statusCode": 404,
                "body": json.dumps({"error": "Item not found"})
            }
    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"error": str(e)})
        }