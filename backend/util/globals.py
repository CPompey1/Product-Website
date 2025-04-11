import os

CLIENT = os.getenv('MONGO_HOST')

DATABASE = 'ProductDb'
COLLECTIONS = 'products,accounts,stores,loggedInUsers,categories'
CATEGORIES = 'Consumables,Electronics,Apparels,Books,Stationary'
ENV = os.environ.get('ENV', 'local')
CONTENT_2_MIME_TYPE = {"image/jpeg": "jpeg"}
JWT_PW_SALT = "hash"
JWT_DB_SALT = "dbhash"
SSL_CONTEXT =  'adhoc' if ENV == 'local' else (os.environ.get('WEB_CERT'), os.environ.get('WEB_KEY'))
class GlobalStrings:
    AUTHTOKEN = "auth_token"
