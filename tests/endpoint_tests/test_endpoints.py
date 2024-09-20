import pytest
import sys
sys.path.append(".")
import unittest
from app import app  # Import the Flask app from the app module
from pathlib import Path
from util.ProductDatabase import ProductDatabase
import random
from time import *
from util.AccountsManager import AccountsManager
# get the resources folder in the tests folder
resources = Path(__file__).parent / "resources"

class FlaskTestCase(unittest.TestCase):
    def setUp(self):
        # Set up the test client for Flask
        self.app = app.test_client()
        self.app.testing = True

    def test_index(self):
        # Send a GET request to the index route
        result = self.app.get('/product_list')

        # Assert that the request succeeded (status code 200)
        self.assertEqual(result.status_code, 200)
    
    def test_add_product(self):
        randomTitle = random.randint(1,100).__str__()
        response = self.app.post("/add_product", data={
            "Title": randomTitle,
            "Description": "description added by flask test",
            "Image": "/home/linus/workspace/Product-Website/tests/resources/testFile",
        })



        product_list_res = self.app.get('/product_list').get_json()
        
        db_res = ProductDatabase().get_collection('products').find_one_record({"Title":randomTitle})
        
        if db_res != None: 
            ProductDatabase().get_collection('products').delete_record_by_id(str(db_res["_id"]))
        
        assert db_res != None
        

        assert str(db_res["_id"]) in [str(product['_id'])  for product in product_list_res]

        if db_res: print("res item:\n\t" + str(db_res))

    def test_register_login(self):
        test_email = f"{str(random.randbytes(10))}@gmail.com"
        test_user = f"{str(random.randbytes(10))}"
        test_password = str(random.randbytes(10))
        response = self.app.post("/register_account", data={
            "Email": test_email,
            "User": test_user,
            "Password": test_password,
            "Password_re": test_password
        })

        
        response1 = self.app.post("/login_account", data={
            "Email": test_email,
            "Password": test_password
        })

        AccountsManager()._delete_user_by_email(test_email)

        self.assertEqual(response.status_code,200)
        self.assertEqual(response1.status_code,200)

        response




if __name__ == '__main__':
    unittest.main()
