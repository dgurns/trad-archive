ifeq "$(PSCALE_REGION)" ""
	PSCALE_REGION := eu-west
endif

ifeq "$(NODE_ENV)" ""
	NODE_ENV := development
endif

GIT_BRANCH := $(shell git branch --show-current)

default: api

# Run the API as a Serverless app
api:
	NODE_ENV=development sls offline start -s dev

# Run the API as an Express server - faster locally than Serverless
api-express:
	nodemon -e ts --exec "make express-build && make express-run NODE_ENV=development"

# Run the migration currently defined in `migration-scratchpad.sql` against the
# local MYSQL DB and this branch's pscale DB
migrate:
	-mysql --protocol=tcp trad_archive < src/migration-scratchpad.sql
	-pscale shell trad_archive ${GIT_BRANCH} < src/migration-scratchpad.sql

# Make the PlanetScale DB for this branch accessible on localhost
pscale-db:
	pscale connect trad_archive ${GIT_BRANCH}

api-express-with-delay:
	sleep 1
	make api-express

# Run the PlanetScale DB branch and Express app simultaneously
pscale-db-and-express:
	make -j pscale-db api-express-with-delay

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

# Build and run the API as an Express server for production
express-prod:
	make express-build
	make express-run NODE_ENV=production

# Seed local MYSQL DB with the current schema for the app. Note that this will
# erase any trad_archive data you have locally!
init-local-db-schema:
	mysql -h 127.0.0.1 -u admin -p < api/src/seed/init-db-schema.sql

# Export current schema of local trad_archive MYSQL DB to the init-db-schema 
# seed file
dump-local-db-schema:
	mysqldump \
		-h 127.0.0.1 \
		-u admin \
		-p \
		--no-data \
		--databases \
		trad_archive > api/src/seed/init-db-schema.sql