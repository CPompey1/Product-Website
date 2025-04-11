import os
from flask import Blueprint, Flask, Response, jsonify, make_response, request

from util import api_functions
app = Flask(__name__)


products = Blueprint('products',__name__,url_prefix='/api/products')
@products.route('/add_product',methods=['POST'])
def add_product():
    # print("in add product")
    # print((request.get_json()))

    requestInput = request.get_json()
    # print(forminput)

    # print("files: " +  str(request.files))
    uploads = request.files
    if uploads:
        for filename in uploads.keys():
            file_data = uploads[filename].read()
     
            #save file
            file_path = f"{os.getcwd()}/dynamic_assets/images/productimages/{uploads[filename].filename}"
            os.makedirs(os.path.dirname(file_path), exist_ok=True)
            with open(file_path, 'wb') as file_to_write:
                file_to_write.write(file_data)
                file_to_write.close()

            #update form input fields
            requestInput["Image"] = uploads[filename].filename
    

    resp = make_response(jsonify(requestInput))

    #add to database
    api_functions.insert_new_product(requestInput)
    
    #set some headers
    api_functions.add_default_headers(resp)
    resp.mimetype = 'application/json'
    
    return resp, 200

@products.route('/product_list',methods=['POST'])
def get_product_list() -> Response:
    """
    Searches product list by store and a category.
    If store is null, searches all stores. 
    If category is null, return a feed. If both are null, return all products.

     Request
    {
        "store" :  string,
        "category" : string
        
    }
    
    Response
    [
        {
            "Title": "",
            "_id": "",
            "imageSrc": "",
            "text": ""
        },
        ...
    ]
    
    Returns:
        Response
    """
    
    request_dict = request.get_json()
    products = api_functions.get_all_products_v1(request_dict.get("store"),request_dict.get("category"))
    resp = jsonify(products)
    resp.status = 200
    return resp

@products.route('/product/<product_id>',methods=['GET'])
def get_product(product_id):
    product = api_functions.get_product_by_id(product_id)
    resp = jsonify(product)
    if product:
        resp.status = 200
    return resp 

app.register_blueprint(products)