---
title: Vue Template
description: Vue template architecture and included libraries
order: 3
---

The Vue template uses Vue 3 with the Composition API and TypeScript. It includes a complete setup for building production applications.

## Tech stack

| Category | Library |
|----------|---------|
| Framework | Vue 3 + TypeScript |
| Styling | TailwindCSS |
| Components | Shadcn Vue |
| State | Pinia |
| HTTP client | Axios |
| Server state | TanStack Query |
| Routing | Vue Router |
| i18n | Vue I18n |

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
├── App.vue                # Root component
├── assets/                # Global styles and static files
│   └── index.css         # Main stylesheet
├── components/            # Shared components
├── config/                # App configuration
│   └── axios.ts          # Axios instance
├── layout/                # Layout components
│   └── DefaultLayout.vue # Main layout wrapper
├── locales/               # Translation files
│   ├── en.json           # English
│   └── mm.json           # Burmese
├── main.ts               # Entry point
├── modules/               # Feature modules
│   └── home/
│       └── HomeView.vue  # Example feature
├── router/                # Route configuration
│   └── index.ts
└── stores/                # Pinia stores
```

## Architecture

### Feature modules

Organize features in the `modules/` folder. Each module contains its views, components, and composables.

### API layer

The `api/` folder centralizes HTTP requests. The Axios instance is configured in `config/axios.ts`:

```typescript
// api/products/index.ts
import { api } from '../index';

export const getProducts = () => api.get('/products');
export const getProduct = (id: string) => api.get(`/products/${id}`);
```

Use with TanStack Query:

```vue
<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import { getProducts } from '@/api/products';

const { data, isLoading } = useQuery({
  queryKey: ['products'],
  queryFn: getProducts
});
</script>
```

### State management

Pinia stores are in the `stores/` folder:

```typescript
// stores/user.ts
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null
  }),
  actions: {
    setUser(user) {
      this.user = user;
    }
  }
});
```

## Internationalization

Translations are in `locales/`. The template includes English and Burmese by default.

```vue
<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
  <h1>{{ t('welcome') }}</h1>
</template>
```

## Conventions

- Place new features in `modules/`
- Keep API logic in `api/`
- Use Pinia stores in `stores/` for client state
- Use TanStack Query for server state
