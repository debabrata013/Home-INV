import boto3
from core.db import dynamodb
import utils.common as common_utils
import services.user_service as usr_service
from core.auth import generate_jwt_token, check_hash, generate_hash

USR_TABLE = usr_service.USR_TABLE

def validate_pwd(pwd):
    if common_utils.check_empty(pwd):
        raise Exception("400- Password is mandatory!")
    return True

def compare_pwd(new_pwd, confirm_pwd):
    if common_utils.check_empty(confirm_pwd):
        raise Exception("400- Confirm Password is mandatory!")
    if not new_pwd == confirm_pwd:
        raise Exception("400- Passwords don't match!")
    return True

def auth_user(input): 
    username = input["username"]
    input_pwd = input["pwd"]    
    usr_service.validate_username(username)
    validate_pwd(input_pwd)
    usr_data = usr_service.fetch_user_by_name(input)
    if not usr_data:
        raise Exception("401- Username is invalid!")
    hashed_pwd = usr_data["password"]
    if not check_hash(hashed_pwd, input_pwd):
        raise Exception("401- Username and Password invalid!")    
    data = {}
    data["username"] = usr_data["username"]          
    data["auth_token"] = generate_jwt_token(username)              
    return data

def change_pwd(input):
    username = input["username"]
    existing_pwd = input["existing_pwd"]
    new_pwd = input["new_pwd"]
    confirm_pwd = input["confirm_pwd"]    
    validate_pwd(existing_pwd)
    compare_pwd(new_pwd, confirm_pwd)
    usr_data = usr_service.fetch_user_by_name(input)
    hashed_pwd = usr_data["password"]
    if not check_hash(hashed_pwd, existing_pwd):
        raise Exception("401- Existing password is invalid!")
    new_pwd = generate_hash(new_pwd)    
    usr_tbl = dynamodb.Table(USR_TABLE)
    usr_tbl.update_item(
        Key={'username': username},
        UpdateExpression="set password=:pwd",
        ExpressionAttributeValues={':pwd': new_pwd}        
    )   
    data = usr_service.fetch_user_by_name(input)
    return data
