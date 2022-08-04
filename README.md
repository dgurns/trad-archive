<img src="https://user-images.githubusercontent.com/1173791/140646257-f20de005-dbaf-4c6e-8995-728b3792a4d9.png" height="80" />

# Trad Archive

_Under active development._

_Collaborators welcome! Please reach out to dan [at] dangurney [dot] net, or comment on an issue/PR._

## Project Summary

This is an open source experiment in collaboration with the Irish Traditional Music Archive.

With this project, community members can...

- Listen to previously unreleased archival recordings
- Help by tagging each recording with People, Tunes, Instruments, and Collections
- Save favorites to listen later

## Local Setup

### Dependencies

- [Node 16.10 or above](https://nodejs.org/en/)
  - Recommended to install and manage via [nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable)
- [PlanetScale CLI](https://github.com/planetscale/cli#installation)
  - Version 0.91 or above

### Database

- There are two ways to run a database for local development: run a local MYSQL instance or expose the PlanetScale DB branch locally

  - Run local MYSQL instance

    - For Mac, try [DBngin](https://dbngin.com/) for an easy way to get started
    - Initialize your DB:

    ```sh
    # Switch to remix directory
    > cd remix

    # Make sure all dependencies are installed
    > yarn install --frozen-lockfile

    # Take the schema in `prisma/schema.prisma` and apply it to your local DB
    > npx prisma db push

    # Seed the database with some sample data
    > npx prisma db seed

    # Open a browser tab to view DB data
    > npx prisma studio

    # If you want to completely reset your DB and wipe all the data
    > npx prisma migrate reset
    ```

  - Expose PlanetScale DB branch locally
    - This project uses a service called [PlanetScale](https://planetscale.com/) which applies the Git branching model to databases.
    - There is a `master` DB branch which always contains the most up-to-date production schema and can only be updated by a "deploy request" (essentially a pull request).
    - When you create a new Git branch and push it up to GitHub, CI/CD will automatically create a matching PlanetScale branch of the same name.
    - You can then expose that branch locally by running `pscale connect trad_archive [your-branch-name]`, and connect to it like a local MYSQL DB.

### Run the App

```sh
# Go to remix directory
> cd remix

# Install dependencies
> yarn install --frozen-lockfile

# Start the dev server
> yarn dev

# Visit the app at http://localhost:3000
```
