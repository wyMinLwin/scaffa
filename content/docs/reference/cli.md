---
title: CLI Reference
description: Complete reference for Scaffa CLI commands and options
order: 1
---

## Usage

```bash
npx create-scaffa@latest [project-name] [options]
```

## Arguments

### project-name

Optional. The name for your project directory.

- If omitted, you will be prompted to enter a name
- Must match pattern: `^(?![-_])[A-Za-z0-9-_]+(?<![-_])$`
- Cannot start or end with `-` or `_`

## Options

### -t, -template

Select a template without prompting.

| Value | Description |
|-------|-------------|
| `react` | React 19 + TypeScript template |
| `vue` | Vue 3 + TypeScript template |

Example:

```bash
npx create-scaffa@latest my-app -t react
```

### -p, -package

Select a package manager without prompting.

| Value | Description |
|-------|-------------|
| `npm` | Use npm for dependency installation |
| `pnpm` | Use pnpm for dependency installation |

Example:

```bash
npx create-scaffa@latest my-app -p pnpm
```

## Template variants

When selecting a template, you will be prompted to choose a variant:

| Variant | Description |
|---------|-------------|
| Backbone | Minimal setup with essential configuration only |
| Colorful | Full example with UI components and multiple pages |

## Examples

### Interactive mode

Run without arguments for guided setup:

```bash
npx create-scaffa@latest
```

### Fully scripted

Specify all options for non-interactive execution:

```bash
npx create-scaffa@latest my-app -t vue -p pnpm
```

Note: The variant selection (Backbone/Colorful) currently requires interactive input even in scripted mode.

### CI/CD usage

For automated pipelines:

```bash
npx create-scaffa@latest my-app -t react -p npm
cd my-app
npm run build
```

## What happens during execution

1. **Parse arguments** - CLI flags are processed
2. **Prompt for missing info** - Interactive prompts for unspecified options
3. **Download template** - Template is fetched from GitHub
4. **Update package.json** - Project name is set
5. **Install dependencies** - Package manager runs install
6. **Display success** - Instructions for next steps

## Exit codes

| Code | Description |
|------|-------------|
| 0 | Success |
| 1 | Error (invalid input, network failure, etc.) |
