# Product-Website

## Installing dependencies

### Virtual environment and modules
./build/build_venv.sh

### Docker 

Figure it out, it aint hard

### Python
Figure it out, it aint hard

### NodeJs
Figure it out, it aint hard

Then 

```
cd frontend/
npm install
```

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
