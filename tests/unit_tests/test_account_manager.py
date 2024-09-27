import unittest 
import random
import sys

sys.path.append(".")
from util.Status import Status
from util.AccountsManager import AccountsManager

class TestAccountsManager(unittest.TestCase):
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
        test_username = str(random.randbytes(10))
        test_email = f"{str(random.randbytes(10))}@gmail.com"
        test_password = str(random.randbytes(10))

        account_manager = AccountsManager()
        
        if account_manager._get_user_match(test_email) != None:
            self.test_register()
        
        status = account_manager.register_user(test_username,test_email,test_password)
        
        self.assertEqual(status,Status.REGISTER_SUCCESS)

        status,token = account_manager.login_user(test_email,test_password)

        account_manager._delete_user_by_email(test_email)


        self.assertEqual(status, Status.LOGIN_SUCCESS)

        self.assertIsNot(token,None)


# Running the tests
if __name__ == '__main__':
    unittest.main()