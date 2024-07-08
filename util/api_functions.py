from util.globals import *
from util import ProductDatabase
def content_2_mime_type(content_type):
    return CONTENT_2_MIME_TYPE[content_type]

def add_default_headers(response):
    response.headers['X-Content-Type-Options'] = 'nosniff'

def insert_new_product(forminput):
    db = ProductDatabase.ProductDatabase()
    db.collections['products'].insert_record(forminput)