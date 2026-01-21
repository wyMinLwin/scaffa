---
title: React Template
description: React template architecture and included libraries
order: 2
---

The React template uses React 19 with TypeScript and includes a complete setup for building production applications.

## Tech stack

| Category | Library |
|----------|---------|
| Framework | React 19 + TypeScript |
| Styling | TailwindCSS |
| Components | ShadcN UI (Radix primitives) |
| HTTP client | Axios |
| Server state | TanStack Query |
| Routing | React Router |
| i18n | i18next |
| Theme | next-themes |

## Getting started

After scaffolding, install dependencies and start the dev server:

```bash
cd your-project
pnpm install
pnpm dev
```

## Folder structure

```filetree
src/
├── api/                    # API layer
│   ├── index.ts           # Axios instance and base config
│   └── products/          # Example API module
├── App.tsx                # Root component
├── assets/                # Global styles and static files
├── components/            # Shared components
│   └── ui/               # ShadcN UI components
├── configs/               # App configuration
├── layouts/               # Layout components
│   └── DefaultLayout.tsx # Main layout wrapper
├── lib/                   # Utility functions
├── locales/               # Translation files
│   ├── en.json           # English
│   └── mm.json           # Burmese
├── main.tsx              # Entry point
├── modules/               # Feature modules
│   └── home/
│       └── HomeView.tsx  # Example feature
├── router/                # Route configuration
│   └── Router.tsx
└── shared/                # Shared types and utilities
```

## Architecture

### Feature modules

Organize features in the `modules/` folder. Each module contains its views, components, and logic. This scales well as the application grows.

### API layer

The `api/` folder centralizes HTTP requests. Each resource has its own module:

```typescript
// api/products/index.ts
import { api } from '../index';

export const getProducts = () => api.get('/products');
export const getProduct = (id: string) => api.get(`/products/${id}`);
```

Use with TanStack Query:

```typescript
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '@/api/products';

function ProductList() {
  const { data, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts
  });
}
```

## Internationalization

Translations are in `locales/`. The template includes English and Burmese by default.

```typescript
import { useTranslation } from 'react-i18next';

function Component() {
  const { t } = useTranslation();
  return <h1>{t('welcome')}</h1>;
}
```

## Conventions

- Place new features in `modules/`
- Keep API logic in `api/`
- Use layouts for consistent page structure
- Add shared components to `components/`
