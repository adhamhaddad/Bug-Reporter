# Bug-Reporter

## Description

This is a Bug-Reporter platform called `Bug-Reporter` that allow users to report issues.

## Dependencies

- Node v14.15.1 (LTS) or more recent. While older versions can work it is advisable to keep node to latest LTS version

- npm 6.14.8 (LTS) or more recent, Yarn can work but was not tested for this project

## Installation

### Database setup

1. Open postgres terminal with: `psql postgres`

1- `CREATE DATABASE bug_reporter;`

2- `CREATE ROLE admin WITH PASSWORD 'admin123';`

3- `ALTER ROLE admin WITH SUPERUSER CREATEROLE CREATEDB LOGIN;`

4- `GRANT ALL PRIVILEGES ON DATABASE bug_reporter TO admin;`

2. Second to install the node_modules run `npm install` or `yarn`. After installation is done start the api in dev mode with `npm run dev` or `yarn dev`.

## Unit Tests:

No Unit test available now.

## Built With
- [Node](https://nodejs.org) - Javascript Runtime
- [Express](https://expressjs.com/) - Javascript API Framework
- [PostgreSQL](https://www.postgresql.org/) - Open Source Relational Database
