import services
import json

def route(event, context):
    
    service = (event["headers"]["Service"] 
                    if "Service" in event["headers"] 
                    else event["headers"]["service"])
                    
    input = {}  
    if service == "fetch_all_categories":
        data = services.fetch_all_categories(input)
    elif service == "save_category":        
        input = json.loads(event["body"])        
        data = services.save_category(input)
        
    elif service == "delete_category":        
        input["cat_name"] = (event["headers"]["Cat-Name"]
                        if "Cat-Name" in event["headers"]
                        else event["headers"]["cat-name"])        
        data = services.delete_category(input)    
        
    else:
        raise Exception("400-Invalid service")          
    
    return data

