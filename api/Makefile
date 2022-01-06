ifeq "$(PSCALE_REGION)" ""
	PSCALE_REGION := eu-west
endif

ifeq "$(NODE_ENV)" ""
	NODE_ENV := development
endif

GIT_BRANCH := $(shell git branch --show-current)

.PHONY: run-migration run-migration-local create-pscale-deploy-request

# Default `make` target which runs PlanetScale DB branch and API simultaneously
default:
	make -j 2 db api

db:
	@if [ ${GIT_BRANCH} = "master" ]; then\
    echo "Please checkout a new Git branch for development";\
		exit 1;\
  fi
	-pscale branch create trad_archive ${GIT_BRANCH} --region ${PSCALE_REGION}
	pscale connect trad_archive ${GIT_BRANCH}

api:
	NODE_ENV=development sls offline start -s dev

import-itma-atom-collections:
	sls invoke local -f importItmaAtomCollections -s dev

import-tunes:
	sls invoke local -f importTunes -s dev

keep-warm:
	sls invoke local -f keepWarm -s dev

migrate:
	pscale shell trad_archive ${GIT_BRANCH} < src/migration-scratchpad.sql

# PlanetScale deploy request commands: Create, list, diff, approve, deploy

create-pscale-dr:
	pscale dr create trad_archive ${GIT_BRANCH} --deploy-to master

list-pscale-drs:
	pscale dr list trad_archive

diff-pscale-dr:
	pscale dr diff trad_archive $$NUMBER

approve-pscale-dr:
	pscale dr review trad_archive $$NUMBER --approve

deploy-pscale-dr:
	pscale dr deploy trad_archive $$NUMBER

# Commands for running the API as an Express server

express-build:
	npx swc src -d .express-server-dist

express-run:
	NODE_ENV=${NODE_ENV} node .express-server-dist/express-server/index.js

express-dev:
	nodemon -e ts --exec "make express-build && make express-run NODE_ENV=development"

express-prod:
	make express-build
	make express-run NODE_ENV=production