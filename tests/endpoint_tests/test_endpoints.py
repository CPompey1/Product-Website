from functools import wraps
import json
import sys

import bcrypt

sys.path.append(".")
from util.Status import Status
from util.appdata import PWD_SALT
from util.globals import CATEGORIES

import unittest
from app import app  # Import the Flask app from the app module
from pathlib import Path
from util.ProductDatabase import ProductDatabase
import random
from time import *
from util.AccountsManager import AccountsManager
from tests.GlobalTestUtility import GlobalTestUtility
# get the resources folder in the tests folder
resources = Path(__file__).parent / "resources"

class FlaskTestCase(unittest.TestCase):
    def setUp(self):
        # Set up the test client for Flask
        self.app = app.test_client()
        self.app.testing = True
        self.test_user = None
        self.test_user_id = ""
        self.user_auth_token = ""
    def test_index(self):
        # Send a GET request to the index route
        result = self.app.post('/product_list')

        # Assert that the request succeeded (status code 200)
        self.assertEqual(result.status_code, 200)
    
    def test_add_product(self):
        randomTitle = random.randint(1,100).__str__()
        response = self.app.post("/add_product", data=json.dumps({
            "title": randomTitle,
            "description": "description added by flask test",
            "image": "/home/linus/workspace/Product-Website/tests/resources/testFile",
        }),
        content_type='application/json')

        self.assertEqual(response.status_code,200)

        product_list_res = self.app.post('/product_list', 
                                         data = json.dumps({}),
                                         content_type='application/json').get_json()
        
        with ProductDatabase() as pdb: 
            db_res = pdb.get_collection('products').find_one_record({"title":randomTitle})
        
        assert db_res != None
        
        if db_res != None: 
            with ProductDatabase() as pdb: 
                pdb.get_collection('products').delete_record_by_id(str(db_res["_id"]))
        
        
        

        assert str(db_res["_id"]) in [str(product['_id'])  for product in product_list_res]

        if db_res: print("res item:\n\t" + str(db_res))
        
        #assert empty values are none
        self.assertIsNone(db_res.get('Category'))

    def test_register_login(self):
        test_email = f"{str(random.randbytes(10))}@gmail.com"
        test_user = f"{str(random.randbytes(10))}"
        test_password = str(random.randbytes(10))
        response = self.app.post("/register_account", data= json.dumps({
            "email": test_email,
            "user": test_user,
            "password": test_password,
            "password_re": test_password
        }),
        content_type='application/json')

        
        response1 = self.app.post("/login_account", data=json.dumps({
            "email": test_email,
            "password": test_password
        }),
        content_type='application/json')

        AccountsManager()._delete_user_by_email(test_email)

        self.assertEqual(response.status_code,200)
        self.assertEqual(response1.status_code,200)
        print("done")

    def test_register_login_validate(self):
        test_email = f"{str(random.randbytes(10))}@gmail.com"
        test_user = f"{str(random.randbytes(10))}"
        test_password = str(random.randbytes(10))
        response = self.app.post("/register_account", data=json.dumps({
            "email": test_email,
            "user": test_user,
            "password": test_password,
            "password_re": test_password
        }),
        content_type='application/json')

        
        response1 = self.app.post("/login_account", data=json.dumps( {
            "email": test_email,
            "password": test_password
        }),
        content_type='application/json')

        AccountsManager()._delete_user_by_email(test_email)

        
        self.assertEqual(response.status_code,200)
        self.assertEqual(response1.status_code,200)

    def test_get_category(self):
        
        response = self.app.get("/api/get_categories")
        self.assertEqual(response.status_code,200)

        response = json.loads(response.get_data())
        
        #Should also probably assert length
        
        for dbCategory in response:
            self.assertIn(dbCategory['title'],CATEGORIES)
                                     
    
    def generate_login_then_delete_user(func):
        @wraps(func)
        def wrapper(self,*args, **kwargs):
            
            self.test_user_password =  GlobalTestUtility.generate_random_string(10)
            
            self.test_user = dict({
                "user": f"{GlobalTestUtility.generate_random_string(10)}",
                "email": f"{GlobalTestUtility.generate_random_string(10)}@gmail.com",
                "password_hash": bcrypt.hashpw(self.test_user_password.encode(),PWD_SALT)
            })
            
            with ProductDatabase() as pdb:
                res = pdb.get_collection('accounts').insert_record(self.test_user)
                self.test_user_id = str(res.inserted_id)
            print(f"Created user: {self.test_user}") 
            
            status,token = AccountsManager().login_user(self.test_user['email'],self.test_user_password)
            
            self.assertEqual(status,Status.LOGIN_SUCCESS)
            
            response = self.app.post("/login_account", data=json.dumps({
                "email": self.test_user['email'],
                "password": self.test_user_password
            }),
            content_type='application/json')
            self.assertEqual(response.status_code,200)
            
            
            self.user_auth_token = token
            
            func(self,*args, **kwargs)
            
            print("Test executed, deleting user...")
            with ProductDatabase() as pdb:
                pdb.get_collection('accounts').delete_record_by_id(self.test_user_id)
            

        return wrapper
    
    @generate_login_then_delete_user
    def test_get_stores_by_user(self):        
        
        #Add Store
        with ProductDatabase() as pdb:
            store = {
                "name": "Test Store",
                "userOwnerId": self.test_user_id
            }
            storeId = str(pdb.get_collection('stores').insert_record(store).inserted_id)
        
        response = self.app.get("/api/stores/get_stores/1", headers = {"Cookie": f"auth_token={self.user_auth_token}"})
        
        self.assertEqual(response.status_code,200)


        response = json.loads(response.get_data())
        
        #Ensure resturned stores are owned by user
        for store in response:
            self.assertEqual(store['userOwnerId'],self.test_user_id)
        
        
        
        #Ensure all stores that are returned are in the database
        responseStoreNames = [store['name'] for store in response]
        with ProductDatabase() as pdb:
            dbStores = pdb.get_collection('stores').find_records_by_field({'userOwnerId':self.test_user_id})
            for dbStore in dbStores:
                self.assertIn(dbStore['name'],responseStoreNames)
                
        #Delete Store
        with ProductDatabase() as pdb:
            pdb.get_collection('stores').delete_record_by_id(storeId)
        
        

        
        



if __name__ == '__main__':
    unittest.main()
