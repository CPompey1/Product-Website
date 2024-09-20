import os

CLIENT = os.getenv('MONGO_HOST')
DATABASE = 'ProductDb'
COLLECTIONS = 'products,accounts,stores, '

CONTENT_2_MIME_TYPE = {"image/jpeg": "jpeg"}
JWT_SALT = "hash"


class GlobalStrings:
    AUTHTOKEN = "auth_token"
