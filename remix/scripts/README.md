# Scripts

These are still a work in progress.

## Export to AtoM CSV

```sh
# Install dependencies
> yarn install --frozen-lockfile

# Run a DB locally, or expose the PlanetScale DB locally
> pscale connect trad_archive master

# Run the export script
> npx ts-node export-to-atom-csv.ts
Fetching data...
Creating CSV...
✅ Successfully exported 20 AudioItems to CSV file at ~/Downloads/export.csv
```
