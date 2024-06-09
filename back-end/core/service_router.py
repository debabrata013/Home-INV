import services

def route(event, context):
    
    service = (event["headers"]["Service"] 
                    if "Service" in event["headers"] 
                    else event["headers"]["service"])
        
    if service == "fetch_all_categories":
        data = services.fetch_all_categories(input)
        
    else:
        raise Exception("400-Invalid service")          
    
    return data
