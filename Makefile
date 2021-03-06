all: optimize-assets build deploy

build:
	yarn build
.PHONY: build

optimize-assets:
	ls assets/ | xargs -I _ epeg --max 1920 assets/_ assets/_
	jpegoptim -S 150 -T 30 assets/*

deploy:
	rclone --config rclone.conf sync -P dist/ space:expo.trestripes.com/2020/
.PHONY: deploy
