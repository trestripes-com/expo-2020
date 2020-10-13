all: optimize-assets build deploy

build:
	yarn build
.PHONY: build

optimize-assets:
	ls assets/ | xargs -I _ epeg --max 1920 assets/_ assets/_

deploy:
	rclone --config rclone.conf sync dist/ space:ar.trestripes.com/
.PHONY: deploy
