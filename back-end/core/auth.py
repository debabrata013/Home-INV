import jwt
from werkzeug.security import generate_password_hash, check_password_hash
import utils.common as common_utils

SECRET_KEY = "*!fPZmdHHV8H9Ckr2LkEFTYu"
HASHING_ALGORITHM = "sha256"
JWT_ALGORITHM = "HS256"
def generate_hash(val):
    hashed_val = generate_password_hash(val, HASHING_ALGORITHM)
    return hashed_val
def check_hash(hashed_val, clear_val):
    return check_password_hash(hashed_val,clear_val)
def generate_jwt_token(username):
    jwt_token = jwt.encode(
        {
            "username": username,
            "exp": common_utils.get_current_timestamp(1200),
        },
        SECRET_KEY,
        algorithm=JWT_ALGORITHM
    )
    return jwt_token
def validate_jwt_token(jwt_token):
    try:        
        decoded_data = jwt.decode(
            jwt_token,
            SECRET_KEY,
            algorithms=JWT_ALGORITHM
        )
        return decoded_data    
    except jwt.ExpiredSignatureError:
        raise Exception("400-Token has expired!")
    except Exception as exc:
        raise Exception("403-Access denied!")