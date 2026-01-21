---
title: Templates
description: Overview of available templates and their features
order: 1
---

Scaffa provides templates for React and Vue, each with two variants.

## Variants

### Backbone

Minimal setup with essential configuration. Use this when you want:

- A clean starting point without example code
- Full control over project structure
- To build your UI from scratch

### Colorful

Feature-rich setup with example pages and components. Use this when you want:

- Working examples to reference
- Pre-built UI components
- A head start on common patterns

## Shared features

All templates include:

| Feature | Library |
|---------|---------|
| Type checking | TypeScript |
| Styling | TailwindCSS |
| HTTP client | Axios |
| Server state | TanStack Query |
| Routing | React Router / Vue Router |
| i18n | i18next / Vue I18n |
| Build tool | Vite |
| Linting | ESLint |
| Formatting | Prettier |

## Project structure

All templates follow a consistent structure:

```filetree
src/
├── api/          # API integration and services
├── assets/       # Static assets and global styles
├── components/   # Reusable UI components
├── config/       # Application configuration
├── layouts/      # Layout components
├── lib/          # Utility functions
├── locales/      # Translation files (en, mm)
├── modules/      # Feature modules
├── router/       # Route definitions
└── stores/       # State management (Vue only)
```
