<script>
	import NavButton from '$lib/components/NavButton.svelte';
</script>

<svelte:head>
	<title>Templates | Scaffa</title>
	<meta name="description" content="Available templates and their features in Scaffa" />
</svelte:head>

<section class="space-y-8 tracking-wider font-light">
	<h1 class="text-3xl font-semibold">Available Templates</h1>

	<section>
		<h2 class="text-2xl font-medium mt-10 mb-3 text-primary">React</h2>

		<p>
			A modern <strong>React + TypeScript</strong> template with two variants, providing a solid foundation
			for scalable applications.
		</p>

		<h3 class="text-lg font-semibold mt-6 mb-2">Variants</h3>
		<ul class="list-disc pl-6 space-y-2">
			<li>
				<strong>Backbone:</strong>
				<span class="pl-2 text-light light:text-dark"
					>Minimal UI codebase with essential setup and clean examples. Ideal for starting from
					scratch with best practices in place.</span
				>
			</li>
			<li>
				<strong>Colorful:</strong>
				<span class="pl-2 text-light light:text-dark"
					>Includes beautiful UI examples and pre-built components for a polished, ready-to-use
					look.</span
				>
			</li>
		</ul>

		<h3 class="text-lg font-semibold mt-6 mb-2">Key Features</h3>
		<ul class="list-disc pl-6 space-y-1">
			<li>TypeScript for type safety</li>
			<li>TailwindCSS for utility-first styling</li>
			<li>Shadcn UI component library</li>
			<li>Axios for API integration</li>
			<li>TanStack Query for data fetching and caching</li>
			<li>React Router for navigation</li>
			<li>i18next for internationalization</li>
			<li>Pre-configured ESLint & Prettier</li>
			<li>Vite for fast development</li>
		</ul>
	</section>

	<section>
		<h2 class="text-2xl font-medium mt-10 mb-3 text-primary">Vue</h2>
		<p>
			A robust <strong>Vue 3 + TypeScript</strong> template with best practices for modern web apps.
		</p>

		<h3 class="text-lg font-semibold mt-6 mb-2">Key Features</h3>
		<ul class="list-disc pl-6 space-y-1">
			<li>Vue 3 with Composition API</li>
			<li>TypeScript for type safety</li>
			<li>TailwindCSS for styling</li>
			<li>Pinia for state management</li>
			<li>Axios for API integration</li>
			<li>TanStack Query for advanced data handling</li>
			<li>Vue Router for navigation</li>
			<li>Vue I18n for localization</li>
			<li>Pre-configured ESLint & Prettier</li>
			<li>Vite for fast development</li>
		</ul>
	</section>

	<section>
		<h2 class="text-2xl font-medium mt-10 mb-3">What’s Included in Every Template?</h2>
		<ul class="list-disc pl-6 space-y-1">
			<li>Modern, scalable project structure</li>
			<li>Full TypeScript support</li>
			<li>Built-in routing and navigation</li>
			<li>Internationalization setup</li>
			<li>API integration example with Axios</li>
			<li>Data fetching and caching with TanStack Query</li>
			<li>Reusable component examples and layout setup</li>
			<li>Responsive design with TailwindCSS</li>
			<li>Development tools: ESLint, Prettier, etc.</li>
			<li>Vite as the build tool</li>
		</ul>
	</section>

	<section>
		<h2 class="text-2xl font-medium mt-10 mb-3">Typical Project Structure</h2>
		<p>All templates follow a similar, best-practice structure:</p>
		<pre class="overflow-x-auto text-xs bg-muted p-4 rounded mt-2">
src/
├── api/          # API integration and services
├── assets/       # Static assets and global styles
├── components/   # Reusable UI components
├── config/       # Application configuration
├── layouts/      # Layout components
├── lib/          # Utility functions and helpers
├── locales/      # Translation files
├── modules/      # Feature-based modules
├── router/       # Routing configuration
└── stores/       # State management (Pinia for Vue)
        </pre>
	</section>

	<section>
		<h2 class="text-2xl font-medium mt-10 mb-3">Pick your template</h2>
		<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
			<a href="/docs/react" class="h-32 col-span-1 flex flex-col items-center justify-center gap-2 p-4 bg-light/10 light:bg-dark/5 border-px border-mute  rounded-lg">
				<i class="icon-[fa6-brands--react] text-4xl"></i>
				<p>React</p>
			</a>
			<a href="/docs/vue" class="h-32 col-span-1 flex flex-col items-center justify-center gap-2 p-4 bg-light/10 light:bg-dark/5 border-px border-mute  rounded-lg">
				<i class="icon-[famicons--logo-vue]  text-4xl"></i>
				<p>Vue</p>
			</a>
		</div>
		
	</section>

	<div class="w-full flex justify-between items-center mt-16">
		<NavButton class="w-1/3" type="previous" path="/docs/installation" label="Installation" />
	</div>
</section>
