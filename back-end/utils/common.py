def get_error_from_exception(exc):
    error_params = str(exc).split("-")        
    error = {
        "error_code": (int(error_params[0]) 
                        if len(error_params) == 2 
                        else 500),
        "error_message": (error_params[1] 
                            if len(error_params) == 2
                            else "Internal server error")
        }
    return error
def check_empty(val):    
    if val is None:
        return True
    if val == "":
        return True    
    return False
def check_not_alpha(val):    
    if val.isalpha():
        return False
    return True