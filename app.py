from flask import Flask
from flask import *


# app = Flask(__name__)
# @app.route("/")
# def index():
#     resp = make_response(send_from_directory('public/', 'index.html'))
#     # add headers
#     resp.headers['X-Content-Type-Options'] = 'nosniff'

#     return resp

# @app.route("/<path:path>")
# def getPage(path):
#     # print(path)
#     root = '.'
#     if not path.__contains__("public"):
#         root = 'public'
#     resp = make_response(send_from_directory(root,path))
#     resp.headers['X-Content-Type-Options'] = 'nosniff'
#     return resp

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)