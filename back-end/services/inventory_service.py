from core.db import dynamodb
import utils.common as common_utils
import services.category_service as cat_service
from boto3.dynamodb.conditions import Key, Attr
INV_TABLE = "inventory"
STATUS_LIST = ["high","medium","low"]
def validate_item_name(item_name):
    if common_utils.check_empty(item_name):
        raise Exception("400-Item Name is mandatory!")
    if common_utils.check_special_characters(item_name):
        raise Exception("400-Item Name must not contain special characters")
    return True
def validate_item_status(status):
    if common_utils.check_empty(status):
        raise Exception("400-Item Status is mandatory!")
    if status not in STATUS_LIST:
        raise Exception("400-Item Status is invalid!")
    return True
def validate_cat_name(cat_name):    
    categories = cat_service.fetch_all_categories(None)
    for cat in categories:
        if cat["cat_name"] == cat_name:
            return True
    raise Exception("400-Category Name is invalid!")
def fetch_all_inventory(input):
    inv_tbl = dynamodb.Table(INV_TABLE)
    result = inv_tbl.scan()
    data = result["Items"]    
    return data

def fetch_inventory_by_name(input):
    item_name = input["item_name"]
    validate_item_name(item_name)
    inv_tbl = dynamodb.Table(INV_TABLE)
    result = inv_tbl.get_item(
        Key={
            'item_name': item_name,            
        }
    )    
    data = result['Item'] if "Item" in result else {}

 
    return data

def fetch_inventory_by_status(input):   
    item_status = input["item_status"]
    validate_item_status(item_status)
    inv_tbl = dynamodb.Table(INV_TABLE)
    result = inv_tbl.scan(
            FilterExpression=Attr('qty_level').eq(item_status)
    )    
    data = result['Items'] if "Items" in result else {}
 
    return data

def save_inventory_item(input):  
    validate_item_name(input["item_name"])
    validate_cat_name(input["cat_name"])
    validate_item_status(input["item_status"])
    inv_tbl = dynamodb.Table(INV_TABLE)    
    input["last_updated_by"] = "jack.ryan"
    input["last_updated_at"] = common_utils.get_current_date_time()
    inv_tbl.put_item(
        Item={
            'item_name': input["item_name"],
            'cat_name': input["cat_name"],
            'qty_level': input["item_status"],
            'last_updated_by': input["last_updated_by"],
            'last_updated_at': input["last_updated_at"],
            'comment': input["comment"],
        }
    )
   
    return fetch_inventory_by_name(input)

def delete_inventory_item(input):    
    item_name = input["item_name"]    
    validate_item_name(item_name)
    inv_tbl = dynamodb.Table(INV_TABLE)    
    inv_tbl.delete_item(
        Key={
            'item_name': item_name
        }
    )
    data = {}    
    return data    