from core.db import dynamodb
import utils.common as common_utils
import boto3
from core.auth import generate_hash
TEMPORARY_PASSWORD = "golden-eye"
USR_TABLE = "users"
LOGIN_STATUS_LIST = ["enabled","disabled"]
def validate_username(username):
    if common_utils.check_empty(username):
        raise Exception("400-Username is mandatory!")    
    return True

def validate_firstname(firstname):
    if common_utils.check_empty(firstname):
        raise Exception("400-First Name is mandatory!")
    if common_utils.check_not_alpha(firstname):
        raise Exception("400-First Name should contain only letters")        
    return True    
def validate_login_status(status):
    if status not in LOGIN_STATUS_LIST:
        raise Exception("400-Login Status is invalid!")
    return True
def validate_lastname(lastname):    
    if common_utils.check_not_alpha(lastname):
        raise Exception("400-Last Name should contain only letters")        
    return True        
def fetch_all_users(input):   
    usr_tbl = dynamodb.Table(USR_TABLE)
    result = usr_tbl.scan()
    data = result["Items"] 
    return data

def fetch_user_by_name(input):
    username = input["username"]
    validate_username(username)
    usr_tbl = dynamodb.Table(USR_TABLE)
    result = usr_tbl.get_item(
        Key={
            'username': username,            
        }
    )    
    data = result['Item'] if "Item" in result else {}
    return data

def save_user(input):     
    validate_username(input["username"])
    validate_firstname(input["firstname"])
    validate_lastname(input["lastname"])
    validate_login_status(input["login_status"])
    login_stat = True
    if input["login_status"] == "disabled":
            login_stat = False
    usr_tbl = dynamodb.Table(USR_TABLE) 
    usr_data = fetch_user_by_name(input)
    if not usr_data:
        temporary_pwd = generate_hash(TEMPORARY_PASSWORD)
        usr_tbl.put_item(
            Item={
                'username': input["username"],
                'first_name': input["firstname"],
                'last_name': input["lastname"],
                'login_stat': login_stat,
                'password': temporary_pwd
            }
        )
    else:
        usr_tbl.update_item(
            Key={'username': input["username"]},
            UpdateExpression=("set first_name=:fn, last_name=:ln, login_stat=:stat"),
            ExpressionAttributeValues={                
                ':fn': input["firstname"],
                ':ln': input["lastname"],
                ':stat': login_stat
            }
        )                 
    
    return fetch_user_by_name(input)

def delete_user(input): 
    username = input["username"]    
    validate_username(username)
    usr_tbl = dynamodb.Table(USR_TABLE)    
    usr_tbl.delete_item(
        Key={
            'username': username
        }
    )
    data = {}       
    return data