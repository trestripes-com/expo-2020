all: build deploy

build:
	yarn build
.PHONY: build

deploy:
	rclone --config rclone.conf sync dist/ space:ar.trestripes.com/
.PHONY: deploy
