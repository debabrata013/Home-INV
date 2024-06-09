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
    