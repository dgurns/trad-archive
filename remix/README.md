## Development

```sh
# install deps
yarn install --frozen-lockfile

# start the DB
# run locally via the MYSQL server of your choice,
# or connect to PlanetScale DB branch:
pscale connect trad_archive [name_of_your_branch]

# update DB schema to reflect latest code
npx prisma db push

# seed DB if it's empty
npx prisma db seed

# start the remix dev server
yarn dev
```

Open up [http://localhost:3000](http://localhost:3000) and you should be ready to go!
