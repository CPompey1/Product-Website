from util.globals import *
from util import ProductDatabase
from flask import Flask,jsonify,request
from flask import *
def content_2_mime_type(content_type):
    return CONTENT_2_MIME_TYPE[content_type]

def add_default_headers(response):
    response.headers['X-Content-Type-Options'] = 'nosniff'

def default_success_response():
    response = make_response()
    add_default_headers(response)
    response.status = 200
    return response

def insert_new_product(forminput):
    db = ProductDatabase.ProductDatabase()
    db.collections['products'].insert_record(forminput)

def get_all_products():
    db = ProductDatabase.ProductDatabase()
    raw_records = db.collections['products'].get_all_records()
    records = []
    n = 0
    for raw_record in raw_records:
        try:

            # print(raw_record["Image"])
            records.append({        
                "_id": str(raw_record['_id']),
                "Title" : raw_record["Title"],
                "text":   raw_record["Description"],
                "imageSrc":f"/dynamic_assets/images/productimages/{raw_record['Image']}",
  
            })
            n+=1
        except KeyError as e:
            # print(f"Key not found in {raw_record} record\n Exception: {e}")
            print(f"Exception: {e}")
            print(f"\tKeys: {raw_record.keys()}")
            # print(f"Full Record:\n\t id: n\n\t  imageSrc: {}")
            pass
        # except Exception as e:
        #     print(f"Exception occured (get_all_products): {e}")

    return records