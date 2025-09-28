# Contributing to Asgardeo JavaScript SDKs

This guide walks you through setting up the development environment and other important information for contributing to Asgardeo JavaScript SDKs.

## Table of Contents

- [Prerequisite Software](#prerequisite-software)
- [Development Tools](#development-tools)
  - [NX Console](#nx-console)
  - [React Developer Tools](#react-developer-tools)
  - [ESLint Plugin](#eslint-plugin)
  - [Code Spell Checker](#code-spell-checker)
  - [JSON Sort Order](#json-sort-order)
- [Setting up the Source Code](#setting-up-the-source-code)
- [Setting up the Development Environment](#setting-up-the-development-environment)
- [Contributing to the Documentation](#contributing-to-the-documentation)
- [Commit Message Guidelines](#commit-message-guidelines)
  - [Commit Message Header](#commit-header)
    - [Type](#type)
    - [Scope](#scope)
    - [Summary](#summary)
  - [Commit Message Body](#commit-body)
  - [Commit Message Footer](#commit-footer)
  - [Revert commits](#revert-commits)

## Prerequisite Software

To build and write code, make sure you have the following set of tools on your local environment:

- [Git](https://git-scm.com/downloads) - Open source distributed version control system. For install instructions, refer [this](https://www.atlassian.com/git/tutorials/install-git).
- [Node.js](https://nodejs.org/en/download/) - JavaScript runtime. (`v18 or higher`)
- [pnpm](https://pnpm.io/) - Alternate npm client for faster package installs. (`v9 or higher`)

## Development Tools

| Extension | Description | VS Code Marketplace |
|-----------|-------------|---------------------|
| NX Console | Editor plugin which wraps NX commands so you don't have to memorize. | [Install](https://marketplace.visualstudio.com/items?itemName=nrwl.angular-console) |
| ESLint | Static code analysis tool for identifying problematic patterns found in JavaScript/Typescript code. | [Install](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) |
| Code Spell Checker | A basic spell checker that works well with code and documents. | [Install](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker) |
| JSON Sort Order | Sorts JSON objects in alphabetical order. | [Install](https://marketplace.visualstudio.com/items?itemName=msyesyan.json-sorter) |

## Setting up the Source Code

1. [Fork](https://docs.github.com/en/github/getting-started-with-github/fork-a-repo) the repository.
2. Clone your fork to the local machine.

Replace `<github username>` with your own username.

```shell
git clone https://github.com/<github username>/javascript.git
```

3. Set the original repo as the upstream remote.

```shell
git remote add upstream https://github.com/asgardeo/javascript.git
```

## Setting up the Development Environment

1. Install dependencies.

```bash
pnpm install
```

2. Build the project.

```bash
pnpm build
```

## Contributing to the Documentation

The documentation for Asgardeo JavaScript SDKs is maintained in the Asgardeo / WSO2 Identity Server Official Docs site.

- [Asgardeo Docs](https://wso2.com/asgardeo/docs)
- [WSO2 Identity Server Docs](https://is.docs.wso2.com/en/latest/)

To contribute to the documentation, please send a pull request to the [Asgardeo Docs repository](https://github.com/wso2/docs-is).

## Commit Message Guidelines

We use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) as the commit message convention.

Please refer to the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) documentation for more information.

> [!IMPORTANT]
>
> 1. Use the imperative, present tense: "change" not "changed" nor "changes".
> 2. Don't capitalize the first letter.
> 3. No dot (.) at the end.

### Types

Must be one of the following:

- **chore**: Housekeeping tasks that doesn't require to be highlighted in the changelog
- **feat**: A new feature
- **ci**: Changes to our CI configuration files and scripts (examples: GitHub Actions)
- **fix**: A bug fix
- **build**: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
- **docs**: Documentation only changes
- **perf**: A code change that improves performance
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **test**: Adding missing tests or correcting existing tests

### Scope

The scope should be the name of the npm package affected (as perceived by the person reading the changelog generated from commit messages).

The following is the list of supported scopes:

- `javascript` - Changes to the `@asgardeo/javascript` package.
- `browser` - Changes to the `@asgardeo/browser` package.
- `node` - Changes to the `@asgardeo/node` package.
- `express` - Changes to the `@asgardeo/express` package.
- `i18n` - Changes to the `@asgardeo/i18n` package.
- `react` - Changes to the `@asgardeo/react` package.
- `react-router` - Changes to the `@asgardeo/react-router` package.
- `nextjs` - Changes to the `@asgardeo/nextjs` package.
- `vue` - Changes to the `@asgardeo/vue` package.
- `nuxt` - Changes to the `@asgardeo/nuxt` package.

> [!NOTE]
> If the change affects multiple packages, just use the type without a scope, e.g., `fix: ...`.

### Example Commit Message

Each commit message consists of a **header**, a **body**, and a **footer**.

```
<type>(<scope>): <short summary>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

```
# Update issue templates to include '@asgardeo/i18n' and improve version description
chore: update issue templates to include '@asgardeo/i18n' and improve version description

# Add a new feature to the react package.
feat(react): add `SignInWithPopup` method to facilitate popup-based authentication flows.

# Update GitHub Actions workflows to include linting and testing steps.
ci: enhance GitHub Actions workflows with linting and testing steps

```

### Revert commits

If the commit reverts a previous commit, it should begin with `revert:`, followed by the header of the reverted commit.

The content of the commit message body should contain:

- Information about the SHA of the commit being reverted in the following format: `This reverts commit <SHA>`.
- A clear description of the reason for reverting the commit message.
