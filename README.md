<div align="center">
    <h1>VaxFinder - Frontend</h1>
</div>

<div align="center">
    <strong>The frontend for the Vaccine Hunters Finder tool.</strong>
</div>

<br/>

<div align="center">
    In the current sprint, the goal is to make a front end which allows pharmacists and approved individuals to make updates on the website on vaccine availability at pharmacies. A user will be able to see all pharmacies with availability, but not change availability status.
</div>

## Setup

Clone the repository:

```sh
$ git clone git@github.com:Vaccine-Hunters-Canada/VaxFinder-Frontend.git
```

Optionally create a `.env.local` file and define the path to the API server:

```
REACT_APP_API_URL=http://localhost:5000
```

## Development

Start the app in development mode at http://localhost:3000:

```sh
$ yarn start
```

## Development with a mocked api

Start the app in development mode with a mocked api at http://localhost:3000:

```sh
$ yarn start:mock-api
```

### Codegen

Generate TypeScript types and typesafe React hooks based off the OpenAPI schema:

```sh
$ yarn generate:api
```

### Lint

This codebase uses ESLint to ensure code consistency, proper formatting and quality. Most major IDEs include an ESLint extension that will draw attention to linting issues. There are also usually settings in IDEs to fix linting issues automatically. For example, in VS Code, these settings are `Format on Save` and `Format on Paste`.

If an extension is not available to you, runnning `yarn lint` will scan the codebase for linting violations.

```sh
$ yarn lint
```

Attempts to resolve certain linting violations where possible.

```sh
$ yarn lint:fix
```

## Test

Run tests in interactive watch mode:

```sh
$ yarn test
```

## Build

Builds the app for production to the `build` folder:

```sh
$ yarn build
```

## Production

https://witty-ocean-02e42dd0f.azurestaticapps.net/
