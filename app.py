from flask import Flask,jsonify
from flask import *
import os

# app = Flask(__name__)
# @app.route("/")
# def index():
#     resp = make_response(send_from_directory('public/', 'index.html'))
#     # add headers
#     resp.headers['X-Content-Type-Options'] = 'nosniff'

#     return resp



app = Flask(__name__)

@app.route('/')
def index():
    dev_mode = os.getenv('FLASK_ENV') == 'development'
    return make_response(send_from_directory('frontend/public/','index.html'))

@app.route("/<path:path>")
def getPage(path):
    # print(path)
    root = '.'
    if not path.__contains__("frontend/public"):
        root = 'frontend/public'
    resp = make_response(send_from_directory(root,path))
    resp.headers['X-Content-Type-Options'] = 'nosniff'
    return resp

@app.route('/products')
def products():
    data = {'key1': 'value1', 'key2': 'value2'}
    return jsonify(data)
if __name__ == '__main__':
    app.run(debug=True)