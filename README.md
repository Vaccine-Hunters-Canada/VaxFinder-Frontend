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

```sh
REACT_APP_API_URL=http://localhost:5000
```
Before beginning development, install the required packages by running `yarn install` or `npm i`.


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

## Troubleshooting api client generation

There appears to be a bug in `restful-react` when it comes to generating members from OpenApi's `anyOf` operator. At the time of writing, this gets written `apiClient.ts`:

```
export interface VaccineAvailabilityTimeslotUpdateRequest {
  time: string;
  takenAt?: {};
}
```

This will produce an error:

> Don't use `{}` as a type. `{}` actually means "any non-nullish value".

When this happens, you will need to examine the OpenApi schema and determine what the appropriate type should be, and manually update `apiClient.ts`

Bug to track: https://github.com/contiamo/restful-react/issues/317