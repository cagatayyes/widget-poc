# Casino Project Frontend

- [Casino Demo &rarr;](https://b2b-demo-development.1337pro.com/casino)

## Introduction

**This project is the frontend part of the Casino application, developed using React with TypeScript. It's set up with Create React App (CRA) and utilizes with modern development tools and practices.**

## Getting Started

**To get started with the Casino App, `clone` the repository and `run` the following commands in the project directory:**

## Installation
Node 20 is used to run this project
### `yarn`

## Running the Application

### `yarn start`

### `yarn start:preprod`

### `yarn start:prod`

## Scripts

### `yarn test` Run tests using Jest.

### `yarn lint` Lint the project using ESLint.

### `yarn build` This commands for creating single widget to the `dist` folder.

### `yarn analyze` Analyze the bundle size.

## Project Structure

- `src`: Contains the source code with app.tsx, index.tsx packages, and pages.
- `public/locales`: Localization files for react-i18n.
- `env`: Environment variables.
- `github/workflows`: Contains GitHub Actions workflows.
- `husky`: Husky configurations for pre-commit hooks.

## Localization

We use `react-i18n` for localization. You can find and edit localization files in the `public/locales` folder. You can find configuration files in the `src/packages/i18n`

## Babel and Webpack

- `Babel`: Add new namespaces in .babelrc and place your package in src/packages.\
- `Webpack`: Configurations can be changed in the extended webpack.config.file.

## Testing and Linting

`Husky` is used for pre-commit hooks to enforce lint and test checks.\
Run `yarn lint` or `yarn test` for linting and testing.

# Creating a new tag

- `yarn version` and enter new version number. This auto updates the package.json
- `git push --tags`

# Deployment

## `Commits to develop branch will auto deploy to a CDN and version number comes from the package`.

## `Initial dev deployment link -  https://casino-cdn.leetent.co.uk/dev/0.1.1/casino-widget-0.1.1.js`

# Google fonts Material UI outlined is used for the icons
## `https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200`

# Google fonts Roboto is used for the fonts
## `https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&display=swap`

# components folder structure is decided as below
- `Component name ex:  "Navigation"`
- `Navigation component can contain styles under Navigatio.styles.ts or styles.ts`
- `Navigation component can contain test under Navigation.tests.tsx or tests.tsx`
- `Navigation component can contain constants under Navigation.constants.tsx or constants.tsx`

# Recommended to use minimal styled component as it increases bundle size.
