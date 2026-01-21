---
title: Installation
description: How to install and create a new project with Scaffa
order: 2
---

## Interactive mode

Run Scaffa without arguments to use the interactive prompts:

```bash
npx create-scaffa@latest
```

The CLI will guide you through:

1. **Project name** - The folder name for your project
2. **Template** - React or Vue
3. **Variant** - Backbone (minimal) or Colorful (with examples)
4. **Package manager** - npm or pnpm

Dependencies are installed automatically after scaffolding.

## Scripted mode

Pass arguments to skip prompts. Useful for automation:

```bash
npx create-scaffa@latest my-app -t react -p pnpm
```

### Available flags

| Flag | Values | Description |
|------|--------|-------------|
| `-t`, `-template` | `react`, `vue` | Select template |
| `-p`, `-package` | `npm`, `pnpm` | Select package manager |

### Examples

Create a React project with npm:

```bash
npx create-scaffa@latest my-react-app -t react -p npm
```

Create a Vue project with pnpm:

```bash
npx create-scaffa@latest my-vue-app -t vue -p pnpm
```

## Project name rules

The project name must:

- Start and end with a letter or number
- Contain only letters, numbers, hyphens, and underscores
- Not start or end with a hyphen or underscore

Valid: `my-app`, `app123`, `my_project`

Invalid: `-my-app`, `my-app-`, `_app_`

## After installation

Navigate to your project and start the dev server:

```bash
cd my-app
pnpm dev
```

The development server runs at `http://localhost:5173` by default.
