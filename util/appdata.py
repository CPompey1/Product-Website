
import os
import random
import bcrypt
from util.LoggedUserTracker import LoggedUserTracker
from util.ProductDatabase import ProductDatabase


PROJDIR = os.getcwd()
loggedInUserTracker = LoggedUserTracker()
PWD_SALT = bcrypt.gensalt()
