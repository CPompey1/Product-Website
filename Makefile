all: bundle.js
	cp frontend/dist/bundle.js public/
	flask run
bundle.js: frontend/src/
	cd frontend
	npx webpack --mode production
	cd ../
# clean:
	
	

