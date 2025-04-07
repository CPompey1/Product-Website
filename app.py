from flask import Flask
from flask import *
app = Flask(__name__)

from util.endpoints_router import *

if __name__ == '__main__':
    context = ('local.crt', 'local.key')
    # app.run(host='0.0.0.0',debug=True,ssl_context=context)
    app.run(host='0.0.0.0',debug=True, ssl_context='adhoc')