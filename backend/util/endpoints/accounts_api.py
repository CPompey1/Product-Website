from flask import Blueprint, Flask, make_response, request

from util import LoggedUserTracker, Status, api_functions
from util.AccountsManager import AccountsManager
from util.globals import GlobalStrings
from util.appdata import loggedInUserTracker

app = Flask(__name__)
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
    
app.register_blueprint(accounts)