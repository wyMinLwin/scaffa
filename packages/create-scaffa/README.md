# Scaffa Packages

## create-scaffa

CLI tool of scaffa that generate frontend templates.

[![npm version](https://img.shields.io/npm/v/create-scaffa.svg)](https://www.npmjs.com/package/create-scaffa)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## Overview

This directory contains the core packages for the Scaffa project. Each package serves a specific purpose in the overall project structure.

## Packages

### CLI

**Path:** `packages/create-scaffa`

The CLI package provides a command-line interface for creating and managing frontend projects using the predefined templates.

**Key Files:**

- `bin/index.js`: Main entry point for the CLI commands.
- `templates.js`: Contains the available templates for project creation.
- `templates/`: Directory where actual templates exists.

**Usage:**

```sh
npx create-scaffa@latest
```

### Scaffold

You can even create a project easily with scaffold feature.

```sh
npx create-scaffa@latest <ur-project-name> -t <template> -p <package-manager>
```

**Example**

```sh
npx create-scaffa@latest scaffa-starter -t vue -p pnpm
```

**Check available templates [here](#templates).**

### Templates

| Template  | Tech Stack                                  |
| --------- | ------------------------------------------- |
| **react** | TypeScript, ShadcnUI, Axios, TanStack Query |
| **vue**   | TypeScript, ShadcnUI, Axios, TanStack Query |

Each template includes
**routing**,
**localization**,
**data fetching** and all others necessary things with best practices.

When you run the above command, you will be prompted to:

1. **Enter your project name:** Provide a name for your new project.
2. **Choose Template:** Select a template for your project (e.g., React Standard, Vue Standard).
3. **Choose Package Manager:** Choose your preferred package manager (e.g., npm, pnpm).

## License

This project is licensed under the [MIT License](LICENSE).
