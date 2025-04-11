from flask import Flask
from flask import *
app = Flask(__name__)

from util.endpoints_router import *
if __name__ == '__main__':
    app.run(host='0.0.0.0',debug=True)