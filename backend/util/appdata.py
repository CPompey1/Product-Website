
from flask import Flask
from flask import *
# app = Flask(__name__)
import os
import random
import bcrypt
from util.ContentManager.ContentManagerLocal import ContentManagerLocal
from util.LoggedUserTracker import LoggedUserTracker
from util.ProductDatabase import ProductDatabase


PROJDIR = os.getcwd()
loggedInUserTracker = LoggedUserTracker()
PWD_SALT = bcrypt.gensalt()
env = os.environ.get('ENV', 'local')

contentManager = None
match(env) :
    case 'local' :
        contentManager = ContentManagerLocal()
        pass
    case 'docker' :
        contentManager = ContentManagerLocal()
        pass
    case 'prod' :
        pass
    case _ :
        pass