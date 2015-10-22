export NODE_ENV = test

.PHONY: clean test test-clean test-travis publish build bootstrap

build: clean
	./scripts/build.sh

watch: clean
	./scripts/build.sh --watch

lint:
	node node_modules/.bin/eslint packages/*/src

clean: test-clean
	rm -rf coverage
	rm -rf packages/*/lib

test: lint
	./scripts/test.sh
	make test-clean

test-clean:
	rm -rf packages/*/test/tmp
	rm -rf packages/*/test-fixtures.json

test-travis: bootstrap lint build test

bootstrap:
	npm install
	node scripts/bootstrap.js

publish:
	git pull --rebase
	make test
	node scripts/publish.js
	make clean
