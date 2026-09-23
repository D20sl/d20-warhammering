# D20 Warhammering

Install dependencies:

```bash
yarn
```

Create `.env`, then fill in the Postgres URL and the Keycloak client (`yarn dev` adds `NUXT_SESSION_PASSWORD` itself):

```bash
cp .env.example .env
```

Create the database tables:

```bash
yarn migration:apply
```

Optional, fill the database with fake players and battles:

```bash
yarn test:seed
```

Start the dev server on http://localhost:3000:

```bash
yarn dev
```

Prefix any command with `yarn prod` to run it against `.env.prod`, e.g. `yarn prod migration:apply`.
