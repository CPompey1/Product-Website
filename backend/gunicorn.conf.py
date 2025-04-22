# filepath: /home/linushome/workspace/Product-Website/backend/gunicorn.conf.py

import multiprocessing

# Server socket
bind = "0.0.0.0:5000"

# Worker processes
workers = multiprocessing.cpu_count() * 2 + 1

# Logging
accesslog = "-"  # Log access requests to stdout
errorlog = "-"   # Log errors to stdout
loglevel = "info"  # Set log level to 'info' (similar to Flask dev server)

# Enable request logging
capture_output = True