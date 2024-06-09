import json

# import requests
import traceback
import core.service_router as service_router
import utils.common as common_utils

def lambda_handler(event, context):
    
  
    return {
        "statusCode": 200,
        "body": json.dumps({
            "message": "hello world",
            # "location": ip.text.replace("\n", "")
        }),
    }
def success_response(data):
     response = {
        "statusCode": 200,
        "body": {
            "data": json.dumps(data)
        } 
    }
     return response

def error_response(data):
    response = {
        "statusCode": data["error_code"],
        "body":{
            "error": json.dumps(data)
        }
    }
    return response
def service_handler(event, context):
    try:        
        data = service_router.route(event, context)
        return success_response(data)
        
    except Exception as e:        
        print(traceback.format_exc())         
        error = common_utils.get_error_from_exception(exc)
        return error_response(error)