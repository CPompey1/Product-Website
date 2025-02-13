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
    record  = {
        'title': forminput.get('title'),
        'description': forminput.get('description'),
        'image': forminput.get('image'),
        'category': forminput.get('category'),
        'cost': forminput.get('cost'),
        'store': forminput.get('store')
    }
    db.collections['products'].insert_record(record)

def get_all_products():
    db = ProductDatabase.ProductDatabase()
    raw_records = db.collections['products'].get_all_records()
    return raw_products_to_products(raw_records)

def raw_products_to_products(raw_records: list) -> list:
    """
    Converts raw records ffrom database to records that can be parsed by the frontend

    Args:
        raw_records (list): _description_

    Returns:
        list: _description_
    """
    records = []
    for raw_record in raw_records:
        try:
            records.append({
                "_id": str(raw_record['_id']),
                "title" : raw_record["title"],
                "text":   raw_record["description"],
                "imageSrc":f"/dynamic_assets/images/productimages/{raw_record['image']}",
                "category": raw_record["category"],
                "cost": raw_record["cost"],
                "store": raw_record["store"]
            })
        except KeyError as e:
            print(f"Key not found in {raw_record} record\n Exception: {e}")
            pass
    return records

def get_all_categories() ->list:
    categories = []
    
    with ProductDatabase.ProductDatabase() as pdb:
        categories = pdb.get_collection('categories').get_all_records()
    
     #stringify id's
    def stringify_id(record):
        record['_id'] = str(record['_id'])
        return record
    
    updatedCategories = map(stringify_id,categories)
    
    return list(updatedCategories)

def get_all_stores() -> list:
    stores = []
    with ProductDatabase.ProductDatabase() as pdb:
        stores = pdb.get_collection('stores').get_all_records()
    
    #stringify id's
    updatedStores = map(stringify_id,stores)
    return list(updatedStores)

def stringify_id(record):
        record['_id'] = str(record['_id'])
        return record
def stringify_ids(records):
    return list(map(stringify_id,records))

def get_products_by_category(category):
    db = ProductDatabase.ProductDatabase()
    records = []
    raw_records = []
    with ProductDatabase.ProductDatabase() as pdb:
        raw_records =  pdb.get_collection('products').find_records_by_field({'category':category})
    for raw_record in raw_records:
        records.append({
            "_id": str(raw_record['_id']),
            "title" : raw_record["title"],
            "text":   raw_record["description"],
            "imageSrc":f"/dynamic_assets/images/productimages/{raw_record['image']}",
        })
    return records
    
def get_all_products_v1(store:str="",category:str="") -> list:
    """   
    Searches product list by store and a category.
    If store is null, searches all stores. 
    If category is null, return a feed. If both are null, return all products.
    
    """
    if store ==None:
        store = ""
    if category == None:
        category = ""    
    db = ProductDatabase.ProductDatabase()
    
    if store == "" and category == "":
        raw_records = db.get_collection('products').get_all_records()
        db.close()
        return raw_products_to_products(raw_records)
    
    if store == "":
        raw_records = db.get_collection('products').find_records_by_field({'category':category})
        db.close()
        return raw_products_to_products(raw_records)
    
    if category == "":
        raw_records = db.get_collection('products').find_records_by_field({'store':store})
        db.close()
        return raw_products_to_products(raw_records)
    
def get_product_by_id(product_id: str) -> dict:
    db = ProductDatabase.ProductDatabase()
    raw_record = db.get_collection('products').find_record_by_id(product_id)
    db.close()
    return raw_products_to_products(raw_record)

def search_item(collection: str, filter_dict: dict) -> dict:
    db = ProductDatabase.ProductDatabase()
    raw_record = db.get_collection(collection).find_one_record(filter_dict)
    db.close()
    if raw_record == None:
        return {}    
    return stringify_id(raw_record)
    
    
    
    
    
    
    
    