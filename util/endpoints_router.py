from flask import Flask,jsonify,request, Blueprint
from flask import *
from bson import ObjectId
from util import Status, api_functions
from util.ContentManager.ContentManagerLocal import ContentManagerLocal
from util.Status import Status
from util.AccountsManager import AccountsManager
from util.appdata import *
import os
from util.globals import CATEGORIES, GlobalStrings

app = Flask(__name__) #dont touch this line

@app.route("/<path:path>")
def getContent(path: str):
    #this function might be tad overcomplicated but it's to prevent directory traversal attacks
    
    resp = ContentManagerLocal().get_file(path)
    api_functions.add_default_headers(resp)
    return resp

stores = Blueprint('stores',__name__,url_prefix='/api/stores')
@stores.route('/get_categories',methods=['GET'])
def get_categories():
    categories = api_functions.get_all_categories()
    resp = jsonify(categories)
    resp.status = 200
    return resp

@stores.route('/add_store',methods=['POST'])
def add_store():
    resp = make_response()
    store = request.get_json()
    auth_token = request.cookies.get(GlobalStrings.AUTHTOKEN)
    
    if not loggedInUserTracker.user_valid(auth_token):
        resp = jsonify({"status":"failed","message":"invalid token"})
        resp.status = 403
        return resp
    
    user = AccountsManager().decode_user_from_token(auth_token)
    
    store['userOwnerId'] = user['_id']
    
    api_functions.insert_new_store(store)
    
    resp = jsonify({"status":"success"})
    resp.status = 200
    return resp

@stores.route('/get_stores', defaults={'userStores': None}, methods=['GET'])
@stores.route('/get_stores/<userStores>',methods=['GET'])
def get_stores(userStores: None):
    
    if userStores != None:
        auth_token = request.cookies.get(GlobalStrings.AUTHTOKEN)
        if not loggedInUserTracker.user_valid(auth_token):
            resp = jsonify({"status":"failed","message":"invalid token"})
            resp.status = 403
            return resp
        else:
            user =  AccountsManager().decode_user_from_token(auth_token)
            userId = str(user['_id'])
            stores = []
            
            with ProductDatabase() as pdb:
                stores =  pdb.get_collection('stores').find_records_by_field({'userOwnerId':userId})
            
            resp = jsonify(api_functions.stringify_ids(stores))
            resp.status = 200
            api_functions.add_default_headers(resp)
            return resp
    stores = api_functions.get_all_stores()
    resp = jsonify(stores)
    api_functions.add_default_headers(resp)
    resp.status = 200
    return resp

@stores.route('/category/<category>',methods=['GET'])
def get_products_by_category(category):
    products = api_functions.get_products_by_category(category)
    resp = jsonify(products)
    resp.status = 200
    return resp
    
@stores.route('/get_store/<storeId>',methods=['GET'])
def get_store(storeId):
    store = api_functions.search_item('stores',{'_id':storeId})
    return jsonify(store)

app.register_blueprint(stores)

accounts = Blueprint('accounts',__name__,url_prefix='/api/accounts')
@accounts.route('/register_account', methods=['POST'])
def register_account():
    res = "-1"
    # formInput = request.form.to_dict()

    accountsManager = AccountsManager()
    
    request_dict = request.get_json()
    res = accountsManager.register_user(request_dict['user'],request_dict['email'],request_dict["password"])


    #Replace with exception handling
    if res == Status.REGISTER_SUCCESS: 
        return api_functions.default_success_response()

    else:
        # print(res)
        res = make_response()
        api_functions.add_default_headers(res)
        res.status = 401
        # print("register failed")
        return res
    
@accounts.route('/login_account', methods=['POST'])
def login_account():
    # formInput = request.form.to_dict()
    request_dict = request.get_json()
    print(request_dict)
    #login user
    status,token =  AccountsManager().login_user(request_dict['email'],request_dict['password'])

    
    response = make_response()
    api_functions.add_default_headers(response)
    match status:
        case Status.LOGIN_FAIL_EMAIL_DNE:
            #if wrong, repley access denied
            print("Login failed: Email DNE")
            response.status= 401
        case Status.LOGIN_FAIL_PW_WRONG:
            #if wrong, repley access denied
            print("Login failed, password wrond")
            response.status = 401
        case Status.LOGIN_SUCCESS:
            response.status = 200
            print("login success")
            response.set_cookie(GlobalStrings.AUTHTOKEN,token)

            #record logged in user
            loggedInUserTracker.add_user(token)

    return response 
    
@accounts.route('/validate_token', methods=['POST'])
def validate_token():
    reqData = request.form.to_dict()
    token = reqData['auth_token']
    response = make_response() 
    api_functions.add_default_headers(response)
    if loggedInUserTracker.user_valid(token):    
        response.status = 200
    else:
        response.status = 403
    return response
    
@accounts.route('/validate_token/store/<storeId>', methods=['GET'])
def validate_token_by_store(storeId):
    token = request.cookies.get(GlobalStrings.AUTHTOKEN)
    if loggedInUserTracker.user_valid(token):
        user = AccountsManager().decode_user_from_token(token)
        store = api_functions.search_item('stores',{'_id':storeId})
        if store['userOwnerId'] == str(user['_id']):
            response = make_response()
            api_functions.add_default_headers(response)
            response.status = 200
            return response
    response = make_response()
    api_functions.add_default_headers(response)
    response.status = 403
    return response

@accounts.route('/validate_token/product/<productId>', methods=['GET'])
def validate_token_by_product(productId):
    token = request.cookies.get(GlobalStrings.AUTHTOKEN)
    if loggedInUserTracker.user_valid(token):
        user = AccountsManager().decode_user_from_token(token)
        product = api_functions.get_product_by_id(productId)
        if product['userOwnerId'] == str(user['_id']):
            response = make_response()
            api_functions.add_default_headers(response)
            response.status = 200
            return response
    response = make_response()
    api_functions.add_default_headers(response)
    response.status = 403
    return response

@accounts.route('/logout', methods=['POST'])
def logout():
    token = request.cookies.get(GlobalStrings.AUTHTOKEN)
    if  loggedInUserTracker.remove_user(token):
        response = make_response()
        api_functions.add_default_headers(response)
        response.status = 200
        return response
    else:
        response = make_response()
        api_functions.add_default_headers(response)
        response.status = 403
        return response

app.register_blueprint(accounts)

api = Blueprint('api',__name__,url_prefix='/api')
@api.route('/checkout/<productId>',methods=['POST'])
def checkout(productId):
    return jsonify({"status":"success","productId":productId})
    
    product = api_functions.get_product_by_id(productId)
    if product:
        return jsonify({"status":"success"})
    return jsonify({"status":"failed"})

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

app.register_blueprint(api)

        
    
            

    

