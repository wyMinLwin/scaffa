# Vue Colorful Template

**[Live Preview](https://vue-colorful.vercel.app)**

A comprehensive Vue.js starter template with modern development tools, beautiful UI components, and best practices built-in. This is the feature-rich version with multiple pages and advanced components.

## ✨ Features

- 🚀 **Vue 3** with TypeScript for type-safe development
- 🎨 **Tailwind CSS** for utility-first styling
- 🧩 **shadcn-vue** components for beautiful, accessible UI
- 📱 **Responsive Design** that works on all devices
- 🌍 **Internationalization** with Vue I18n
- 📊 **State Management** with Pinia
- 🔄 **Data Fetching** with TanStack Query
- 🎯 **API Integration** with Axios
- 🏗️ **Modern Build Tools** with Vite
- 📁 **Organized Structure** with modules and components

## 🛠 Tech Stack

**Framework:** Vue 3, TypeScript  
**Styling:** Tailwind CSS, shadcn-vue  
**State Management:** Pinia  
**Data Fetching:** TanStack Query, Axios  
**Build Tool:** Vite  
**Internationalization:** Vue I18n

## 🚀 Quick Start

**Install Dependencies**

```sh
pnpm install
```

**Run Development Server**

```sh
pnpm run dev
```

**Build for Production**

```sh
pnpm run build
```

## 📱 Pages & Features

- **Home** - Welcome page with feature overview and API demo
- **Dashboard** - Overview with stats cards and recent activity
- **Products** - Product management with search and add functionality
- **Todos** - Task management with priority levels and completion tracking

## 🧩 UI Components

Pre-built shadcn-vue components included:

- **Button** - Various styles and sizes
- **Card** - Content containers with headers and footers
- **Input** - Form input fields
- **Badge** - Status indicators and labels
- **Avatar** - User profile images with fallbacks
- **Skeleton** - Loading state placeholders
- **Navigation** - Responsive navbar with mobile menu

## Folder Structure

<pre>
vue-colorful/
├── .gitignore
├── .editorconfig
├── .gitattributes
├── .prettierrc.json
├── .vscode/
│   ├── extensions.json
│   └── settings.json
├── env.d.ts
├── eslint.config.ts
├── index.html
├── package.json
├── pnpm-lock.yaml
├── public/
├── README.md
├── src/
│   ├── api/
│   │   ├── index.ts
│   │   └── products/
│   ├── App.vue
│   ├── assets/
│   │   └── index.css
│   ├── components/
│   ├── config/
│   │   └── axios.ts
│   ├── layout/
│   │   └── DefaultLayout.vue
│   ├── locales/
│   ├── main.ts
│   ├── modules/
│   │   └── home/
│   │       └── HomeView.vue
│   ├── router/
│   │   └── index.ts
│   └── stores/
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
</pre>
