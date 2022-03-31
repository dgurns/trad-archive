<img src="https://user-images.githubusercontent.com/1173791/140646257-f20de005-dbaf-4c6e-8995-728b3792a4d9.png" height="80" />

# Trad Archive

_Under active development._

_Collaborators welcome! Please reach out to dan [at] dangurney [dot] net, or comment on an issue/PR._

## Project Summary

This is an open source experiment in collaboration with the Irish Traditional Music Archive.

With this project, community members can...

- Listen to previously unreleased archival recordings
- Help by tagging each recording with People, Places, Tunes, Instruments, and Collections
- Save favorites to listen later

## Local Setup

### Dependencies

- [Node 14.x](https://nodejs.org/en/)
  - Recommended to install and manage via [nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable)
- [PlanetScale CLI](https://github.com/planetscale/cli#installation)
  - Version 0.91 or above
- [mysql CLI](https://dev.mysql.com/doc/refman/8.0/en/mysql.html)
  - Instructions for Mac users [here](https://stackoverflow.com/a/55692783/7426333)

### Database

- There are two ways to run a database for local development: run a local MYSQL instance or expose the PlanetScale DB branch locally

  - Run local MYSQL instance

    - For Mac, try [DBngin](https://dbngin.com/) for an easy way to get started
    - Initialize your DB schema by running

    ```sh
    # Switch to API directory
    > cd api

    # Take the schema in `src/seed/init-db-schema.sql` and apply it to your local database
    > make init-local-db-schema
    ```

    - If you already have a local MYSQL instance but the schema is out of date, you can run the same command above and it will refresh your schema. Note that any local data you had will be deleted.

  - Expose PlanetScale DB branch locally
    - This project uses a service called [PlanetScale](https://planetscale.com/) which applies the Git branching model to databases.
    - There is a `master` DB branch which always contains the most up-to-date production schema and can only be updated by a "deploy request" (essentially a pull request).
    - When you create a new Git branch and push it up to GitHub, CI/CD will automatically create a matching PlanetScale branch of the same name.
    - You can then expose that branch locally by running `cd api && make pscale-db`, and connect to it as if it were a local MYSQL DB.

### API

```sh
# Switch to api directory
> cd api

# Install dependencies
> yarn install --frozen-lockfile

# Run the API via Serverless Offline, similar to how it runs in production
> make api

# Or, run the API via Express which is faster locally
> make api-express
```

### Web

```sh
# Switch to web directory
> cd web

# Install dependencies
> yarn install --frozen-lockfile

# Serve the website at http://localhost:3000
> yarn dev
```

### Updating DB Schema

```sh
# Switch to api directory
cd api

# Add the SQL commands you'd like to run in `src/migration.sql`
...
ALTER TABLE user ADD COLUMN test varchar(255);
...

# Apply the migration simultaneously to your local MYSQL DB and the PlanetScale DB branch. If the migration succeeds, it will then update `src/seed/init-db-schema.sql` with the new schema.
> make migrate
```
