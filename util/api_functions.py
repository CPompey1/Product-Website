from util.globals import *
from util import ProductDatabase
def content_2_mime_type(content_type):
    return CONTENT_2_MIME_TYPE[content_type]

def add_default_headers(response):
    response.headers['X-Content-Type-Options'] = 'nosniff'

def insert_new_product(forminput):
    db = ProductDatabase.ProductDatabase()
    db.collections['products'].insert_record(forminput)

def get_all_products():
    db = ProductDatabase.ProductDatabase()
    raw_records = db.collections['products'].get_all_records()
    records = []
    n = 0
    for raw_record in raw_records:
        print(raw_record["Image"])
        records.append({        
            "id": n,
            "title" : raw_record["Title"],
            "imageSrc":f"dynamic_assets/images/productimages/{raw_record["Image"]}",
            "imageAlt" :"blah",
            "text": raw_record["Description"]
        })
        n+=1
    return records