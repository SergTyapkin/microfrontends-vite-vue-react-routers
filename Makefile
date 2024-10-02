#--------------------------------------------------------------
# Please specify the ENV_FILE_NAME in run make commandline     |
# for example: "make all-for-app ENV_FILE_NAME=.env.vue-child" |
# Or run "make all" directly.                                  |
#--------------------------------------------------------------


build: # for every app
	bash ./docker-deploy/scripts/check-env-file-name-provided.sh $(ENV_FILE_NAME) && \
	echo "[Make]: Running 'build' target in Makefile..." && \
	cd docker-deploy && \
	docker compose --env-file $(ENV_FILE_NAME) --env-file ../.env build --no-cache --progress=plain nginx
run: # for every app
	bash ./docker-deploy/scripts/check-env-file-name-provided.sh $(ENV_FILE_NAME) && \
	echo "[Make]: Running 'run' target in Makefile..." && \
	cd docker-deploy && \
	docker compose --env-file $(ENV_FILE_NAME) --env-file ../.env down && \
	docker compose --env-file $(ENV_FILE_NAME) --env-file ../.env up -d nginx
down: # for every app
	bash ./docker-deploy/scripts/check-env-file-name-provided.sh $(ENV_FILE_NAME) && \
	echo "[Make]: Running 'down' target in Makefile..." && \
	cd docker-deploy && \
	docker compose --env-file $(ENV_FILE_NAME) --env-file ../.env down

generate-certs: # for every app
	bash ./docker-deploy/scripts/check-env-file-name-provided.sh $(ENV_FILE_NAME) && \
	echo "[Make]: Running 'generate-certs' target in Makefile..." && \
	bash ./docker-deploy/scripts/generate-certs.sh $(ENV_FILE_NAME)
renew-certs: # for every app
	bash ./docker-deploy/scripts/check-env-file-name-provided.sh $(ENV_FILE_NAME) && \
	echo "[Make]: Running 'renew-certs' target in Makefile..." && \
	cd docker-deploy && \
	docker compose --env-file $(ENV_FILE_NAME) --env-file ../.env run --rm certbot renew
setup-auto-renewing-certs: # for every app
	echo "[Make]: Running 'setup-auto-renewing-certs' target in Makefile..." && \
	bash ./docker-deploy/scripts/setup-auto-renewing-certs.sh $(ENV_FILE_NAME)

update: # for every app
	bash ./docker-deploy/scripts/check-env-file-name-provided.sh $(ENV_FILE_NAME) && \
	echo "[Make]: Running 'update' target in Makefile..." && \
	bash ./docker-deploy/scripts/update-deploy.sh $(ENV_FILE_NAME)

update-all:
	echo "[Make]: Running 'update-all' target in Makefile..." && \
	make update ENV_FILE_NAME=.env.vue-child
	make update ENV_FILE_NAME=.env.react-child
	make update ENV_FILE_NAME=.env.host

setup-ci:
	echo "[Make]: Running 'setup-ci' target in Makefile..." && \
	bash ./docker-deploy/scripts/setup-ci.sh && \
	bash ./docker-deploy/scripts/show-variables-to-github-ci.sh

install-docker-if-not-exists:
	echo "[Make]: Running 'install-docker-if-not-exists' target in Makefile..." && \
	bash ./docker-deploy/scripts/install-docker-if-not-exists.sh

set-docker-not-sudo:
	echo "[Make]: Running 'set-docker-not-sudo' target in Makefile..." && \
	bash ./docker-deploy/scripts/set-docker-not-sudo.sh

setup-env-file: # for every app
	bash ./docker-deploy/scripts/check-env-file-name-provided.sh $(ENV_FILE_NAME) && \
	echo "[Make]: Running 'setup-env-file' target in Makefile..." && \
	bash ./docker-deploy/scripts/setup-env-file.sh $(ENV_FILE_NAME)

copy-env-file-if-not-exists:
	echo "[Make]: Running 'copy-env-file-if-not-exists' target in Makefile..." && \
	bash ./docker-deploy/scripts/copy-env-file-if-not-exists.sh

all-for-app: # for every app
	bash ./docker-deploy/scripts/check-env-file-name-provided.sh $(ENV_FILE_NAME) && \
	echo "[Make]: Running 'all-for-app' target in Makefile..." && \
	echo 'Now we start setup for app specified in env fle: $(ENV_FILE_NAME)' && \
	echo '[To start press Enter...]' && \
	read ENTER
	make setup-env-file # for every app
	make generate-certs # for every app
	make setup-auto-renewing-certs # for every app
	make down # for every app
	make update # for every app


all:
	echo "[Make]: Running 'all' target in Makefile..." && \
	make copy-env-file-if-not-exists
	make install-docker-if-not-exists
	make all-for-app ENV_FILE_NAME=.env.vue-child
	make all-for-app ENV_FILE_NAME=.env.react-child
	make all-for-app ENV_FILE_NAME=.env.host
	make setup-ci
