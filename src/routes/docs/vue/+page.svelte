<svelte:head>
	<title>Vue Template | Scaffa</title>
	<meta name="description" content="Vue Standard Template architecture and details" />
</svelte:head>

<section class="space-y-6 tracking-wider font-light">
	<h2 class="text-2xl font-medium mt-10 mb-3 text-primary">Vue</h2>

	<section>
		<h2 class="text-xl font-medium mt-6 mb-2">Tech Stack</h2>
		<ul class="list-disc ml-6">
			<li><b>UI Framework:</b> Vue 3 + Typescript</li>
			<li><b>Styling:</b> TailwindCSS</li>
			<li><b>State Management:</b> Pinia</li>
			<li><b>Data Fetching:</b> Axios, Tanstack Query</li>
		</ul>
	</section>

	<section>
		<h1 class="text-xl font-medium mt-6 mb-2">Getting Started</h1>
		<ol class="list-decimal ml-6">
			<li>
				Install dependencies:
				<pre class="bg-muted p-2 rounded text-xs">pnpm install</pre>
			</li>
			<li>
				Run the local server:
				<pre class="bg-muted p-2 rounded text-xs">pnpm run</pre>
			</li>
		</ol>
	</section>

	<section>
		<h2 class="text-xl font-medium mt-6 mb-2">Folder Structure & Key Files</h2>
		<pre class="overflow-x-auto text-xs bg-muted p-2 rounded">
vue/
├── .gitignore, .editorconfig, .gitattributes, .prettierrc.json  # Project configs
├── .vscode/                                                     # VSCode settings
├── env.d.ts                                                     # TypeScript env types
├── eslint.config.ts                                             # Linting config
├── index.html                                                   # App entry HTML
├── package.json, pnpm-lock.yaml                                 # Package management
├── public/                                                      # Static assets
├── README.md                                                    # Template readme
├── src/                                                         # Source code
│   ├── api/                                                     # API logic
│   │   ├── index.ts                                             # API entry
│   │   └── products/                                            # Example API modules
│   ├── App.vue                                                  # Root Vue component
│   ├── assets/                                                  # Global styles & images
│   │   └── index.css                                            # Main CSS
│   ├── components/                                              # Reusable UI components
│   ├── config/                                                  # App-wide config (e.g., axios)
│   │   └── axios.ts                                             # Axios instance/config
│   ├── layout/                                                  # Layout components
│   │   └── DefaultLayout.vue                                    # Main layout
│   ├── locales/                                                 # i18n files
│   ├── main.ts                                                  # App entry point
│   ├── modules/                                                 # Feature modules
│   │   └── home/
│   │       └── HomeView.vue                                     # Example feature view
│   ├── router/                                                  # Vue Router setup
│   │   └── index.ts
│   └── stores/                                                  # Pinia stores
├── tsconfig.*.json                                              # TypeScript configs
└── vite.config.ts                                               # Vite build config
		</pre>
		<p class="mt-2">
			Each folder has a clear responsibility, e.g. <code>modules/</code> for feature modules,
			<code>api/</code> for API logic, <code>stores/</code> for Pinia stores, and
			<code>router/</code> for Vue Router setup.
		</p>
	</section>

	<section>
		<h2 class="text-xl font-medium mt-6 mb-2">Architecture Overview</h2>
		<ul class="list-disc ml-6">
			<li><b>Modular:</b> Features are organized in <code>modules/</code> for scalability.</li>
			<li><b>Separation of Concerns:</b> API, config, layout, and store logic are isolated.</li>
			<li><b>Reusable Components:</b> Place shared UI in <code>components/</code>.</li>
			<li><b>Configurable:</b> Easily extend with new modules, layouts, or API endpoints.</li>
		</ul>
	</section>

	<section>
		<h2 class="text-xl font-medium mt-6 mb-2">Best Practices</h2>
		<ul class="list-disc ml-6">
			<li>Use <code>modules/</code> for new features.</li>
			<li>
				Keep API logic in <code>api/</code> and use Axios instance from
				<code>config/axios.ts</code>.
			</li>
			<li>Use Pinia for state management in <code>stores/</code>.</li>
			<li>Organize layouts and shared UI for consistency.</li>
		</ul>
	</section>

	<section>
		<p class="mt-8 text-sm text-muted-foreground">
			For more details, see the template's <code>README.md</code> or explore the codebase!
		</p>
	</section>
</section>
