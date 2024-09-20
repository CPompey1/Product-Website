
import os
import random
import bcrypt
PROJDIR = os.getcwd()

class LoggedUserTracker:
    """
    Data structure that keeps tracks of valid authtokens by users
    

    """
    
    def __init__(self):
        self.logged_in_user_map = []

    def validate_user(self,token: str) -> bool:
        pass

    def add_user(self,token: str) -> bool:
        pass

    def _remove_user(self,token: str) -> None:
        pass


loggedInUsers = LoggedUserTracker()
PWD_SALT = bcrypt.gensalt()