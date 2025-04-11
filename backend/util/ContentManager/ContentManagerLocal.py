import os
from util.ContentManager.ContentManager import ContentManager
from flask import Flask, Response, make_response, send_from_directory

CONTENT_DIRECTORY = f"{os.getcwd()}" 

class ContentManagerLocal(ContentManager):
    def __init__(self):
        return 
    
    def upload_user_asset(self, path: str, file: bytes) -> Response:
        return False
    
    def get_file(self, path: str) -> Response:
        root = CONTENT_DIRECTORY
        resp = make_response()
        resp.status = 404
        print("start")
        # Clean request
        
        if path.__contains__(".."):
            resp.status = 403
            return resp
        
        pathList = path.split("/")
        print(pathList)
        if not (pathList[0]  == "dynamic_assets" or pathList[0] == "static_content"):
            resp.status = 403
            return resp
            
        resp = make_response(send_from_directory(root,path))
        if os.path.exists(os.path.join(root,path)):
            resp.status = 200
        return resp
    
    def get_file_list(self, path: str) -> Response:
        return []
    
    def upload_file(self, path: str, file: bytes) -> Response:
        return False
    