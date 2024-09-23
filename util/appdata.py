
import os
import random
import bcrypt
from util.LoggedUserTracker import LoggedUserTracker
PROJDIR = os.getcwd()


loggedInUserTracker = LoggedUserTracker()
PWD_SALT = bcrypt.gensalt()