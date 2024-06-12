from core.db import dynamodb
import utils.common as common_utils
CAT_TABLE = "categories"

def validate_cat_name(cat_name):
    if common_utils.check_empty(cat_name):
        raise Exception("400-Category Name is mandatory!")
    if common_utils.check_not_alpha(cat_name):
        raise Exception("400-Category Name must contain only letters")
    return True
def fetch_all_categories(input):
    cat_tbl = dynamodb.Table(CAT_TABLE)
    result = cat_tbl.scan()
    data = result["Items"]
    return data
def save_category(input):  
    cat_name = input["cat_name"]
    validate_cat_name(cat_name)
    cat_tbl = dynamodb.Table(CAT_TABLE)
    cat_tbl.put_item(
        Item={
            'cat_name': cat_name,            
        }
    )
      
    return fetch_all_categories(None)
def delete_category(input): 
    cat_name = input["cat_name"]
    validate_cat_name(cat_name)
    cat_tbl = dynamodb.Table(CAT_TABLE)
    cat_tbl.delete_item(
        Key={
            'cat_name': cat_name
        }
    )
   
    data = {}    
    return data  