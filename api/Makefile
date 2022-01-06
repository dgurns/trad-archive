ifeq "$(PSCALE_REGION)" ""
	PSCALE_REGION := eu-west
endif

ifeq "$(NODE_ENV)" ""
	NODE_ENV := development
endif

GIT_BRANCH := $(shell git branch --show-current)

default: dev

# Recommended dev setup: Expose PlanetScale DB branch locally and run API via
# Express
dev:
	make -j db express-dev-with-delay

api:
	NODE_ENV=development sls offline start -s dev

# Make the PlanetScale DB for this branch accessible on localhost
db:
	pscale connect trad_archive ${GIT_BRANCH}

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

express-dev-with-delay:
	sleep 1
	make express-dev

# Build and run the API as an Express server for production
express-prod:
	make express-build
	make express-run NODE_ENV=production