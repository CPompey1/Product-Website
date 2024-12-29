# Product-Website

## Installing dependencies
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements

## Building

### Locally
Run ```./build_and_run``` from the root of the directory

### Docker
docker compose up --build --force-recreate


### Testing 
Run ```python3 tests/endpoint_tests/config/test_endpoints.py```

tests exist in tests/

## Common Problems


### node modules not found

``` 
cd frontend
rm -rf node_modules/
rm -rf package-lock.json
npm install
```
