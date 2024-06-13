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

    elif service == "fetch_all_inventory":
        data = services.fetch_all_inventory(input)
    elif service == "fetch_inventory_by_name":
        input["item_name"] = (event["headers"]["Item-Name"]
                            if "Item-Name" in event["headers"]
                            else event["headers"]["item-name"])
        data = services.fetch_inventory_by_name(input)
    elif service == "fetch_inventory_by_status":   
        input["item_status"] = (event["headers"]["Item-Status"]
                            if "Item-Status" in event["headers"]
                            else event["headers"]["item-status"]) 
        data = services.fetch_inventory_by_status(input)
    elif service == "save_inventory_item":
        input = event["body"]
        input = json.loads(input)
        data = services.save_inventory_item(input)
    elif service == "delete_inventory_item":
        input["item_name"] = (event["headers"]["Item-Name"]
                            if "Item-Name" in event["headers"]
                            else event["headers"]["item-name"]) 
        data = services.delete_inventory_item(input)
    elif service == "fetch_all_users":
        data = services.fetch_all_users(input)
    elif service == "fetch_user_by_name":        
        input["username"] = (event["headers"]["Username"]
                            if "Username" in event["headers"]
                            else event["headers"]["username"]) 
        data = services.fetch_user_by_name(input)    
    elif service == "save_user":
        input = event["body"]
        input = json.loads(input)        
        data = services.save_user(input)
    elif service == "delete_user":
        input["username"] = (event["headers"]["Username"]
                            if "Username" in event["headers"]
                            else event["headers"]["username"]) 
        data = services.delete_user(input)  
        
    else:
        raise Exception("400-Invalid service")          
    
    return data

