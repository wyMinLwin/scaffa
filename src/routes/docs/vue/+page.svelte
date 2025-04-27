<svelte:head>
	<title>Vue Template | Frontend Makro</title>
	<meta name="description" content="Vue Standard Template architecture and details" />
</svelte:head>

<section class="space-y-6 tracking-wider font-light">
	<h1 class="text-2xl font-semibold">Vue Standard Template</h1>

	<section>
		<h2 class="text-xl font-medium mt-6 mb-2">Overview</h2>
		<p>
			The <strong>vue-std</strong> template provides a modern Vue 3 + TypeScript setup with best practices
			for scalable frontend projects. It includes TailwindCSS, Pinia for state management, Axios for
			data fetching, and TanStack Query for advanced data handling.
		</p>
	</section>

	<section>
		<h2 class="text-xl font-medium mt-6 mb-2">Folder Structure</h2>
		<pre class="overflow-x-auto text-xs bg-muted p-2 rounded">
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
		<p>
			Each folder has a clear responsibility, e.g. <code>modules/</code> for feature modules,
			<code>api/</code>
			for API logic, <code>stores/</code> for Pinia stores, and <code>router/</code> for Vue Router setup.
		</p>
	</section>

	<section>
		<h2 class="text-xl font-medium mt-6 mb-2">Key Architecture Concepts</h2>
		<ul class="list-disc ml-6">
			<li>
				<strong>Modular Structure:</strong> Feature modules are isolated in
				<code>src/modules/</code> for scalability.
			</li>
			<li>
				<strong>Centralized API:</strong> All API calls are managed in <code>src/api/</code> and
				<code>src/config/axios.ts</code>.
			</li>
			<li>
				<strong>State Management:</strong> Pinia stores are in <code>src/stores/</code> for global state.
			</li>
			<li><strong>Routing:</strong> <code>src/router/</code> contains all route definitions.</li>
			<li><strong>Localization:</strong> <code>src/locales/</code> for i18n support.</li>
			<li>
				<strong>UI & Layout:</strong> <code>src/components/</code> and <code>src/layout/</code> for reusable
				UI and layouts.
			</li>
		</ul>
	</section>

	<section>
		<h2 class="text-xl font-medium mt-6 mb-2">Best Practices</h2>
		<ul class="list-disc ml-6">
			<li>Use <code>modules/</code> for feature separation.</li>
			<li>Keep API logic out of components.</li>
			<li>Use Pinia for state, not component data for shared state.</li>
			<li>Organize assets and styles in <code>assets/</code>.</li>
			<li>Write composables for reusable logic.</li>
		</ul>
	</section>
</section>
