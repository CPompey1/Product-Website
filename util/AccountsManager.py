from util.Status import Status
from util.ProductDatabase import ProductDatabase as pdb

import bcrypt
import html
import jwt


from util.globals import JWT_SALT
from util.appdata import PWD_SALT

class AccountsManager:
    
    # EMAIL_KEY: str = "email"


    def __init__(self):
        self.pdb = pdb()
        
        return
    
    def register_user(self,username: str,email: str,password: str) -> Status:
        
        user_escaped = html.escape(username)
        email_escaped = html.escape(email)
        password = html.escape(password)

        if self._get_user_match(email_escaped) != None:
            print("user exists")
            return Status.REGISER_FAIL_EMAIL_EXISTS
        
        # user_salt = bcrypt.gensalt()
        password_hash = bcrypt.hashpw(password.encode(),PWD_SALT)

        user = dict({
            "user": user_escaped,
            "email": email_escaped,
            "password_hash": password_hash
        })

        self.pdb.get_collection('accounts').insert_record(user)
        
        return Status.REGISTER_SUCCESS

    # def login_user(self,email: str,password: str):

    #     email = html.escape(email)
    #     password = html.escape(password)
        
    #     found_users =  self._get_user_matches(email)

    #     if len(found_users) <= 0:
    #         return Status.LOGIN_FAIL_EMAIL_WRONG
        

    #     userExists, _ = self._find_email_password_match(found_users,password)

    #     if userExists:
    #         return Status.LOGIN_SUCCESS

    #     return Status.LOGIN_FAIL_PW_WRONG
    
    #returns userExists, foundUser 
    def _find_email_password_match(self,user_list,password_to_match):
        foundUser = None
        for account in user_list:
            if foundUser == None:
                try:
                    if bcrypt.checkpw(password_to_match,account['password_hash']):
                        return True, account
                    
                except KeyError:
                    print("Key Excpetion in _email_password_match_exists: ")
                    print(f"record: {account}")
                    print(f"record keys: {account.keys()}")

        return False, None
                    
        
    def login_user(self,email: str,password: str) -> (Status, str): # type: ignore
        """
        Logins in user with given email and password, returns status
        and jwt token if necessary

        :param email: email of account to login
        :param password: raw password of account to login
        :return (Status, str): Status of login transaction and jwt of logged in user to
        set as a cookie 

        """

        user_match = self._get_user_match(email)
        password = html.escape(password)

        if user_match == None:
            return Status.LOGIN_FAIL_EMAIL_DNE,None
        
        # password_hash = bcrypt.hashpw(password.encode(),PWD_SALT)

        password_match = bcrypt.checkpw(password.encode(),user_match["password_hash"])

        if not password_match:
            print("Invalid Password for matched email")
            return Status.LOGIN_FAIL_PW_WRONG,None
        
        #clean user dictionary (id object not serialiable)
        user_match["_id"] = str(user_match["_id"])
        user_match["password_hash"] = user_match["password_hash"].decode()
        

        return Status.LOGIN_SUCCESS, jwt.encode(user_match, JWT_SALT, algorithm="HS256")
        
    
    def _get_user_match(self,email: str) -> dict:
        email = html.escape(email)
        return self.pdb.get_collection('accounts').find_one_record({'email':email})
    
    
    def _delete_user_by_email(self,email: str):
        email = html.escape(email)
        self.pdb.get_collection('accounts').delete_record_by_match({'email':email})




        