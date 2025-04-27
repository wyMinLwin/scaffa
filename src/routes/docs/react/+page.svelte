<svelte:head>
	<title>React Template | Frontend Makro</title>
	<meta name="description" content="React Standard Template architecture and details" />
</svelte:head>

<section class="space-y-6 tracking-wider font-light">
	<h1 class="text-2xl font-semibold">React Standard Template</h1>

	<section>
		<h2 class="text-xl font-medium mt-6 mb-2">Overview</h2>
		<p>
			The <strong>react-std</strong> template provides a modern React + TypeScript setup with best practices
			for scalable frontend projects. It includes TailwindCSS, Shadcn UI, Axios for data fetching, and
			TanStack Query for advanced data handling.
		</p>
	</section>

	<section>
		<h2 class="text-xl font-medium mt-6 mb-2">Folder Structure</h2>
		<pre class="overflow-x-auto text-xs bg-muted p-2 rounded">
react-std/
├── .gitignore
├── components.json
├── eslint.config.js
├── index.html
├── package.json
├── pnpm-lock.yaml
├── postcss.config.js
├── public/
├── README.md
├── src/
│   ├── api/
│   │   ├── index.ts
│   │   └── products/
│   ├── App.tsx
│   ├── assets/
│   ├── components/
│   │   ├── ui/
│   │   └── Wrapper.tsx
│   ├── configs/
│   ├── index.css
│   ├── layouts/
│   │   └── DefaultLayout.tsx
│   ├── lib/
│   ├── locales/
│   ├── main.tsx
│   ├── modules/
│   │   └── home/
│   │       └── HomeView.tsx
│   ├── shared/
│   └── vite-env.d.ts
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
		</pre>
		<p>
			Each folder has a clear responsibility, e.g. <code>modules/</code> for feature modules,
			<code>api/</code>
			for API logic, <code>shared/</code> for shared utilities, and <code>layouts/</code> for layout
			components.
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
				<code>src/configs/</code>.
			</li>
			<li>
				<strong>State & Data:</strong> Use TanStack Query for async data and React context/hooks for
				state.
			</li>
			<li>
				<strong>UI & Layout:</strong> <code>src/components/</code> and <code>src/layouts/</code> for
				reusable UI and layouts.
			</li>
			<li>
				<strong>Shared Utilities:</strong> <code>src/shared/</code> for helpers and utilities.
			</li>
			<li><strong>Localization:</strong> <code>src/locales/</code> for i18n support.</li>
		</ul>
	</section>

	<section>
		<h2 class="text-xl font-medium mt-6 mb-2">Best Practices</h2>
		<ul class="list-disc ml-6">
			<li>Use <code>modules/</code> for feature separation.</li>
			<li>Keep API logic out of components.</li>
			<li>Use TanStack Query for async data, not local state.</li>
			<li>Organize assets and styles in <code>assets/</code>.</li>
			<li>Write hooks for reusable logic.</li>
		</ul>
	</section>
</section>
