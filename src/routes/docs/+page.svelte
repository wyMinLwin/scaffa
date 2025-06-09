<script lang="ts">
	import CommandLine from '$lib/components/CommandLine.svelte';
	import NavButton from '$lib/components/NavButton.svelte';
</script>

<svelte:head>
	<title>Introduction | Scaffa</title>
	<meta name="description" content="Introduction for Scaffa" />
</svelte:head>

<section class="w-full space-y-8 tracking-wider font-light">
	<h1 class="text-3xl font-semibold pt-3 pb-8 mb-10 border-b border-light/30">Introduction</h1>
	<div class="space-y-4">
		<p>
			<strong>Scaffa</strong> helps you quickly scaffold modern frontend projects using pre-configured
			templates for React and Vue.
		</p>
		<p>
			With built-in support for TypeScript, ShadcnUI, Axios, and TanStack Query, you can focus on
			building your application without worrying about setup and configurations.
		</p>
		<p>
			<strong>Scaffa</strong> is designed to be flexible and extensible, allowing you to customize your
			project according to your needs.
		</p>
		<p>
			Whether you're building a small application or a large-scale project, <strong>Scaffa</strong> provides
			the tools and structure to help you get started quickly.
		</p>
		<p>
			<strong>Scaffa</strong> is a template library which have conventions for building frontend applications,
			neither a component library nor a framework.
		</p>

		<div>
			<p>
				You can get a ready to go template by simply running the following command in your terminal:
			</p>
			<CommandLine command={'npx create-scaffa@latest'} class="w-fit mt-1.5">
				<pre class="select-all font-mono"><span class="text-cool">npx</span>&nbsp;<span
						class="text-primary light:text-secondary">create-scaffa@latest</span
					></pre>
			</CommandLine>
		</div>
	</div>

	<div class="w-full flex justify-between items-center mt-16">
		<NavButton class="ml-auto w-1/3" type="next" path="/docs/installation" label="Installation" />
	</div>
</section>
