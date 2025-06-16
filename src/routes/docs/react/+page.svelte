<svelte:head>
	<title>React Standard Templates | Scaffa</title>
	<meta name="description" content="React Templates architecture and details" />
</svelte:head>

<section class="space-y-6 tracking-wider font-light">
	<h1 class="text-2xl font-medium mt-10 mb-3 text-primary">React</h1>

	<section>
		<h2 class="text-xl font-medium mt-6 mb-2">Tech Stack</h2>
		<ul class="list-disc ml-6">
			<li><b>UI Framework:</b> React + Typescript</li>
			<li><b>Styling:</b> TailwindCSS, Shadcn UI</li>
			<li><b>Data Fetching:</b> Axios, Tanstack Query</li>
		</ul>
	</section>

	<section>
		<h2 class="text-xl font-medium mt-6 mb-2">Getting Started</h2>
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
react-*/
├── .gitignore, eslint.config.js, postcss.config.js         # Project configs
├── components.json                                         # Component registry
├── index.html                                              # App entry HTML
├── package.json, pnpm-lock.yaml                            # Package management
├── public/                                                 # Static assets
├── README.md                                               # Template readme
├── src/                                                    # Source code
│   ├── api/                                                # API logic
│   │   ├── index.ts                                        # API entry
│   │   └── products/                                       # Example API modules
│   ├── App.tsx                                             # Root React component
│   ├── assets/                                             # Global styles & images
│   ├── components/                                         # Reusable UI components
│   │   └── ui/                                             # UI primitives (e.g., Wrapper)
│   ├── configs/                                            # App-wide config
│   ├── index.css                                           # Main CSS
│   ├── layouts/                                            # Layout components
│   │   └── DefaultLayout.tsx                               # Main layout
│   ├── lib/                                                # Utility functions
│   ├── locales/                                            # i18n files
│   ├── main.tsx                                            # App entry point
│   ├── modules/                                            # Feature modules
│   │   └── home/
│   │       └── HomeView.tsx                                # Example feature view
│   ├── router/                                             # React Router setup
│   │   └── Router.tsx
│   ├── shared/                                             # Shared logic/types
│   └── vite-env.d.ts                                       # Vite env types
├── tsconfig.*.json                                         # TypeScript configs
└── vite.config.ts                                          # Vite build config
		</pre>
		<p class="mt-2">
			Each folder has a clear responsibility, e.g. <code>modules/</code> for feature modules,
			<code>api/</code> for API logic, <code>shared/</code> for shared utilities, and
			<code>layouts/</code> for layout components.
		</p>
	</section>

	<section>
		<h2 class="text-xl font-medium mt-6 mb-2">Architecture Overview</h2>
		<ul class="list-disc ml-6">
			<li><b>Feature-Oriented:</b> Use <code>modules/</code> for scalable features.</li>
			<li><b>Separation of Concerns:</b> API, config, layout, and shared logic are isolated.</li>
			<li>
				<b>Reusable Components:</b> Place shared UI in <code>components/</code> and
				<code>components/ui/</code>.
			</li>
			<li><b>Configurable:</b> Easily extend with new modules, layouts, or API endpoints.</li>
		</ul>
	</section>

	<section>
		<h2 class="text-xl font-medium mt-6 mb-2">Best Practices</h2>
		<ul class="list-disc ml-6">
			<li>Add new features in <code>modules/</code>.</li>
			<li>Centralize API logic in <code>api/</code> and use Axios for requests.</li>
			<li>Use <code>layouts/</code> for consistent page structure.</li>
			<li>Organize shared UI and logic for maintainability.</li>
		</ul>
	</section>

	<section>
		<p class="mt-8 text-sm text-muted-foreground">
			For more details, see the template's <code>README.md</code> or explore the codebase!
		</p>
	</section>
</section>
