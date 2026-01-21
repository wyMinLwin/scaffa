---
title: Introduction
description: Get started with Scaffa - a CLI tool for scaffolding modern frontend projects
order: 1
---

Scaffa is a CLI tool that generates production-ready frontend projects with pre-configured tooling. It eliminates the repetitive setup work for React and Vue applications.

## What you get

Every template includes:

- **TypeScript** for type safety
- **TailwindCSS** for styling
- **Shadcn UI** component libraries
- **TanStack Query** for server state management
- **Axios** for HTTP requests
- **Routing** (React Router / Vue Router)
- **Internationalization** (i18next / Vue I18n)
- **Vite** for fast builds

## Quick start

Run the following command and follow the prompts:

```bash
npx create-scaffa@latest
```

You will be asked to:

1. Enter a project name
2. Select a template (React or Vue)
3. Choose a variant (Backbone or Colorful)
4. Pick a package manager (npm or pnpm)

After completion, your project is ready to run.

## Templates

Scaffa provides two frameworks with two variants each:

| Template       | Description                                |
|----------------|--------------------------------------------|
| React Backbone | Minimal setup with essential configuration |
| React Colorful | Full example with UI components and pages  |
| Vue Backbone   | Minimal setup with essential configuration |
| Vue Colorful   | Full example with UI components and pages  |

## Requirements

- Node.js 20.0.0 or higher
- npm or pnpm
