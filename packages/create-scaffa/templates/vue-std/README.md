# Vue Standard Template

## Tech Stack

**Client UI:** Vue, Typescript, TailwindCSS, Pinia

**Client Data Fetch:** Axios, Tanstack

## Run Locally

**Install Dependencies**

```sh
pnpm install
```

**Run Local Server**

```sh
pnpm run
```

## Folder Structure

<pre>
vue-std/
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
