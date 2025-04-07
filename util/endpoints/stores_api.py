from bson import ObjectId
from flask import Blueprint, Flask, jsonify, make_response, request

from util import LoggedUserTracker, api_functions
from util.AccountsManager import AccountsManager
from util.globals import GlobalStrings


app = Flask(__name__)

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
    
    if not LoggedUserTracker.user_valid(auth_token):
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
    store = api_functions.search_item('stores',{'_id':ObjectId(storeId)})
    return jsonify(store)

app.register_blueprint(stores)