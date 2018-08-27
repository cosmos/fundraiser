# consumed by jenkinsfile
# all websites should use the build target
# to put static content in ./dist

build:
	yarn install
	yarn run build

.PHONY: build

