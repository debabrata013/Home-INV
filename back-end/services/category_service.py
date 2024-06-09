from core.db import dynamodb

def fetch_all_categories(input):
    cat_tbl = dynamodb.Table("categories")
    result = cat_tbl.scan()
    data = result["Items"]
    return data