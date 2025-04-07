import string
import unittest 
import random
import sys

sys.path.append(".")
from util.Status import Status
from util.AccountsManager import AccountsManager

class TestAccountsManager(unittest.TestCase):
    #hello
    def test_register(self):
        test_username = str(random.randbytes(10))
        test_email = f"{str(random.randbytes(10))}@gmail.com"
        test_password = str(random.randbytes(10))

        account_manager = AccountsManager()
        
        if account_manager._get_user_match(test_email) != None:
            self.test_register()
        
        status = account_manager.register_user(test_username,test_email,test_password)
        
        self.assertEqual(status,Status.REGISTER_SUCCESS)

        account_manager._delete_user_by_email(test_email)

    def test_register_login(self):
        test_username = self.generate_random_string(10)
        test_email = f'{self.generate_random_string(10)}@gmail.com'
        test_password = self.generate_random_string(10)

        account_manager = AccountsManager()
        
        if account_manager._get_user_match(test_email) != None:
            self.test_register()
        
        status = account_manager.register_user(test_username,test_email,test_password)
        
        self.assertEqual(status,Status.REGISTER_SUCCESS)

        status,token = account_manager.login_user(test_email,test_password)

        user_match = account_manager.decode_user_from_token(token)

        self.assertEquals(user_match['user'],test_username)
        self.assertEquals(user_match['email'],test_email)
        account_manager._delete_user_by_email(test_email)


        self.assertEqual(status, Status.LOGIN_SUCCESS)

        self.assertIsNot(token,None)

    def generate_random_string(self,length):
        return ''.join(random.choices(string.ascii_uppercase + string.digits, k = length))

# Running the tests
if __name__ == '__main__':
    unittest.main()