#!/bin/bash
python3 -m venv .venv
chmod +xwr .venv/bin/activate

#Define environment variables
echo export MONGO_HOST=localhost:27017 >> .venv/bin/activate
echo export ENV=local >> .venv/bin/activate

source .venv/bin/activate
pip install -r backend/requirements


