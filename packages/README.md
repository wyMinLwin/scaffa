# Frontend Makro Packages

## Overview

This directory contains the core packages for the Frontend Makro project. Each package serves a specific purpose in the overall project structure.

## Packages

### CLI

**Path:** `packages/cli`

The CLI package provides a command-line interface for creating and managing frontend projects using the predefined templates.

**Key Files:**
- `bin/index.js`: Main entry point for the CLI commands.
- `templates.js`: Contains the available templates for project creation.
- `templates/`: Directory where actual templates exists.

**Usage:**
```sh
npx create-makro@latest
```

When you run the above command, you will be prompted to:

1. **Enter your project name:** Provide a name for your new project.
2. **Choose Template:** Select a template for your project (e.g., React Standard, Vue Standard).
3. **Choose Package Manager:** Choose your preferred package manager (e.g., npm, pnpm).


## License

This project is licensed under the [MIT License](../LICENSE).