PROJECT_DIR := $(shell pwd)
FRONTEND_BUILD_TGT := $(PROJECT_DIR)/nginx/frontend_build
FRONTEND_BUILD_SRC := $(PROJECT_DIR)/frontend/build
.PHONY: $(FRONTEND_BUILD_TGT)
.PHONY: $(FRONTEND_BUILD_SRC)

docker_up: backend frontend mongo nginx OrderManager docker-compose.yaml $(FRONTEND_BUILD_TGT)
	docker compose up --build --force-recreate; \
    docker exec $(docker ps | grep "backend" | cut -d' ' -f1) python3 scripts/clear_and_write_demo_db.py

local_up: $(PROJECT_DIR)/.venv 
	./build_and_run

$(FRONTEND_BUILD_TGT): $(FRONTEND_BUILD_SRC)
	rm -rf $(FRONTEND_BUILD_TGT)
	cp -r $(FRONTEND_BUILD_SRC) $(FRONTEND_BUILD_TGT)

$(FRONTEND_BUILD_SRC): frontend/src/**/* frontend/public/** frontend/package.json
	cd frontend; rm -rf package-lock.json; npm install --force
	cd frontend; npm run build

$(PROJECT_DIR)/.venv:  $(PROJECT_DIR)/backend/requirements
	./scripts/build_venv.sh
	




	