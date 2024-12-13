from bson import ObjectId
from flask import Flask,jsonify,request, Blueprint
from flask import *
from util import Status, api_functions
from util.Status import Status
from util.AccountsManager import AccountsManager
from util.appdata import *
import os
from util.globals import CATEGORIES, GlobalStrings
app = Flask(__name__)



@app.route("/<path:path>")
def getContent(path):
    #this function might be tad overcomplicated 
    
    # print(path)
    root = PROJDIR

    # Clean request
    if path.__contains__(f"dynamic_assets/images"):
        resp = make_response(send_from_directory(root,path))
        api_functions.add_default_headers(resp)

        if os.path.exists(os.path.join(root,path)):
            resp.status = 200
        return resp
    
    

    if not path.__contains__("frontend/public"):
        root = 'frontend/public'
    
    
    resp = make_response(send_from_directory(root,path))
    if os.path.exists(os.path.join(root,path)):
        resp.status = 200
    api_functions.add_default_headers(resp)
    return resp

@app.route('/product_list',methods=['POST'])
def product_list():
    data = api_functions.get_all_products()
    return jsonify(data)

@app.route('/products')
def products():
    data = {'key1': 'value1', 'key2': 'value2'}
    return jsonify(data)

@app.route('/add_product',methods=['POST'])
def add_product():
    # print("in add product")
    # print((request.get_json()))

    forminput = request.form.to_dict()
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
            forminput["Image"] = uploads[filename].filename
    

    resp = make_response(jsonify(forminput))

    #add to database
    api_functions.insert_new_product(forminput)
    
    #set some headers
    api_functions.add_default_headers(resp)
    resp.mimetype = 'application/json'
    
    return resp, 200

@app.route('/register_account', methods=['POST'])
def register_account():
    res = "-1"
    formInput = request.form.to_dict()

    accountsManager = AccountsManager()

    res = accountsManager.register_user(formInput['User'],formInput['Email'],formInput["Password"])


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
    

@app.route('/login_account', methods=['POST'])
def login_account():
    formInput = request.form.to_dict()

    #login user
    status,token =  AccountsManager().login_user(formInput['Email'],formInput['Password'])

    response = make_response()
    
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
            response.set_cookie(GlobalStrings.AUTHTOKEN,token)

            #record logged in user
            loggedInUserTracker.add_user(token)

    return response 
    
api = Blueprint('api',__name__,url_prefix='/api')
@api.route('/validate_token', methods=['POST'])
def validate_token():
    reqData = request.form.to_dict()
    token = reqData['auth_token']
    response = make_response() 

    if loggedInUserTracker.user_valid(token):    
        response.status = 200
    else:
        response.status = 403
    return response
    

@api.route('/get_categories',methods=['GET'])
def get_categories():
    categories = api_functions.get_all_categories()
    resp = jsonify(categories)
    resp.status = 200
    return resp

@api.route('/stores/get_stores',methods=['GET'])
def get_stores():
    stores = api_functions.get_all_stores()
    resp = jsonify(stores)
    resp.status = 200
    return resp

@api.route('/category/<category>',methods=['GET'])
def get_products_by_category(category):
    products = api_functions.get_products_by_category(category)
    resp = jsonify(products)
    resp.status = 200
    return resp
    
@api.route('/product_list',methods=['POST'])
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

@api.route('/product/<product_id>',methods=['GET'])
def get_product(product_id):
    product = api_functions.get_product_by_id(product_id)
    resp = jsonify(product)
    if product:
        resp.status = 200
    return resp 

@api.route('/checkout/<productId>',methods=['POST'])
def checkout(productId):
    return jsonify({"status":"success","productId":productId})
    
    product = api_functions.get_product_by_id(productId)
    if product:
        return jsonify({"status":"success"})
    return jsonify({"status":"failed"})

@api.route('/stores/get_store/<storeId>',methods=['GET'])
def get_store(storeId):
    store = api_functions.search_item('stores',{'_id':ObjectId(storeId)})
    return jsonify(store)
# @api.route('/testEndpoint/<test>/<extra>',methods=['GET'])
# def testEndpoint(test,extra):
#     return jsonify({'test':test,'extra':extra})
app.register_blueprint(api)

        
    
            

    

