import os

CLIENT = os.getenv('MONGO_HOST')

DATABASE = 'ProductDb'
COLLECTIONS = 'products,accounts,stores,loggedInUsers,categories'
CATEGORIES = 'Consumables,Electronics,Apparels,Books,Stationary'

CONTENT_2_MIME_TYPE = {"image/jpeg": "jpeg"}
JWT_PW_SALT = "hash"
JWT_DB_SALT = "dbhash"

class GlobalStrings:
    AUTHTOKEN = "auth_token"
