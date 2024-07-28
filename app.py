from flask import Flask,jsonify,request
from flask import *
from util import api_functions
import os


app = Flask(__name__)

@app.route('/')
def index():
    dev_mode = os.getenv('FLASK_ENV') == 'development'
    return make_response(send_from_directory('frontend/public/','index.html'))

@app.route("/<path:path>")
def getPage(path):
    # print(path)
    root = '.'

    # This may not be safe
    if path.__contains__("dynamic_assets/images/productimages"):
        resp = make_response(send_from_directory(root,path))
        api_functions.add_default_headers(resp)
        print("uhhh")
        return resp
    

    if not path.__contains__("frontend/public"):
        root = 'frontend/public'
    
    resp = make_response(send_from_directory(root,path))
    api_functions.add_default_headers(resp)
    return resp

@app.route('/product_list')
def product_list():
    # resp = make_response(send_from_directory(f"{os.getcwd()}/dynamic_assets",f"/images/productimages/products.json"))
    
    #set some headers
    # api_functions.add_default_headers(resp)
    # resp.mimetype = 'application/json'
    # return resp, 200
    with open('dynamic_assets/images/productimages/products1.json') as f:
        data = json.load(f)
    # data = {'key1': 'value1', 'key2': 'value2'}
    # print(api_functions.get_all_products())
    data = api_functions.get_all_products()
    # print(type(api_functions.get_all_products()[0]))
    return jsonify(data)
@app.route('/products')
def products():
    data = {'key1': 'value1', 'key2': 'value2'}
    return jsonify(data)
@app.route('/add_product',methods=['POST'])
def add_product():
    forminput = request.form.to_dict()
    #print(forminput.keys())
    uploads = request.files
    #print(uploads)
    #save uploads
    if uploads:
        for filename in uploads.keys():
            print(filename)
            file_data = uploads[filename].read()
            # print(f"upload name: {uploads[filename].filename}")
            # print(f"upload type: {uploads[filename].content_type}")

            #save file
            file_path = f"{os.getcwd()}dynamic_assets/images/productimages/{uploads[filename].filename}"
            os.makedirs(os.path.dirname(file_path), exist_ok=True)
            with open(file_path, 'wb') as file_to_write:
                file_to_write.write(file_data)
                file_to_write.close()

            #update form input fields
            forminput["Image"] = uploads[filename].filename
    

    resp = make_response(jsonify(forminput))
    
    #add to database
    api_functions.insert_new_product(forminput)
    print(forminput)
    
    #set some headers
    api_functions.add_default_headers(resp)
    resp.mimetype = 'application/json'
    return resp, 200
if __name__ == '__main__':
    app.run(host='0.0.0.0',debug=True)