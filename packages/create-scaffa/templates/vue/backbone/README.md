# Vue Backbone Template

**[Live Preview](https://vue-backbone.vercel.app)**

A minimal Vue.js starter template with essential features and best practices built-in.

## Tech Stack

**Client UI:** Vue, Typescript, TailwindCSS, Shadcn Vue

**Client Data Fetch:** Axios, TanStack Query

## Run Locally

**Install Dependencies**

```sh
pnpm install
```

**Run Local Server**

```sh
pnpm run dev
```

**Build for Production**

```sh
pnpm run build
```

## Folder Structure

<pre>
vue-backbone/
├── .gitignore
├── .prettierrc.json
├── components.json
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
│   │   ├── products/
│   │   └── todos/
│   ├── App.vue
│   ├── assets/
│   │   └── index.css
│   ├── components/
│   │   └── ui/
│   │       ├── button/
│   │       ├── input/
│   │       └── sonner/
│   ├── config/
│   │   ├── axios.ts
│   │   └── locale.ts
│   ├── layout/
│   │   └── DefaultLayout.vue
│   ├── lib/
│   │   └── utils.ts
│   ├── locales/
│   │   ├── en.json
│   │   └── mm.json
│   ├── main.ts
│   ├── modules/
│   │   └── home/
│   │       └── HomeView.vue
│   └── router/
│       └── index.ts
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vercel.json
└── vite.config.ts
</pre>
