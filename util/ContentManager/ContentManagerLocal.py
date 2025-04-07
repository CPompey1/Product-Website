import os
from util.ContentManager.ContentManager import ContentManager
from flask import Flask, Response, make_response, send_from_directory

PROJDIR = os.getcwd()

class ContentManagerLocal(ContentManager):
    def __init__(self):
        return 
    
    def upload_user_asset(self, path: str, file: bytes) -> Response:
        return False
    
    def get_file(self, path: str) -> Response:
        root = PROJDIR
        resp = make_response().status = 404
        
        if path.__contains__(".."):
            return "Invalid path", 403
        
        # Clean request
        if path.__contains__(f"dynamic_assets/images"):
            resp = make_response(send_from_directory(root,path))
            if os.path.exists(os.path.join(root,path)):
                resp.status = 200
            return resp
        
        if not path.__contains__("frontend/public"):
            root = 'frontend/public'
        
        resp = make_response(send_from_directory(root,path))
        if os.path.exists(os.path.join(root,path)):
            resp.status = 200
        return resp
    
    def get_file_list(self, path: str) -> Response:
        return []
    
    def upload_file(self, path: str, file: bytes) -> Response:
        return False
    