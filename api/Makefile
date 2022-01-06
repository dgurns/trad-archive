ifeq "$(PSCALE_REGION)" ""
	PSCALE_REGION := eu-west
endif

ifeq "$(NODE_ENV)" ""
	NODE_ENV := development
endif

GIT_BRANCH := $(shell git branch --show-current)

.PHONY: run-migration run-migration-local create-pscale-deploy-request

default:
	make -j 2 db api

# Make this branch's pscale DB accessible on localhost
db:
	pscale connect trad_archive ${GIT_BRANCH}

api:
	NODE_ENV=development sls offline start -s dev

# Run the migration currently defined in `migration-scratchpad.sql` against the
# branch's pscale DB
migrate:
	pscale shell trad_archive ${GIT_BRANCH} < src/migration-scratchpad.sql

import-itma-atom-collections:
	sls invoke local -f importItmaAtomCollections -s dev

import-tunes:
	sls invoke local -f importTunes -s dev

keep-warm:
	sls invoke local -f keepWarm -s dev


express-build:
	npx swc src -d .express-server-dist

express-run:
	NODE_ENV=${NODE_ENV} node .express-server-dist/express-server/index.js

# Run the API as an Express server locally
express-dev:
	nodemon -e ts --exec "make express-build && make express-run NODE_ENV=development"

# Build and run the API as an Express server for production
express-prod:
	make express-build
	make express-run NODE_ENV=production