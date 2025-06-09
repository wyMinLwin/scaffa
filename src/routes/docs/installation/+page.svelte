<script lang="ts">
	import CommandLine from '$lib/components/CommandLine.svelte';
	import NavButton from '$lib/components/NavButton.svelte';
</script>

<svelte:head>
	<title>Installation | Scaffa</title>
	<meta name="description" content="Installation guide for Scaffa" />
</svelte:head>

<section class="w-full space-y-8 tracking-wider font-light">
	<h1 class="text-3xl font-semibold pt-3 pb-8 mb-10 border-b border-light/30">Installation</h1>

	<div class="space-y-6">
		<div class="space-y-4">
			<h2 class="text-xl font-medium">Basic Installation</h2>
			<p>Install <strong>Scaffa</strong> using the following command:</p>
			<CommandLine command={'npx create-scaffa@latest'} class="w-fit mt-1.5">
				<pre><span class="text-cool">npx</span>&nbsp;<span class="text-primary light:text-secondary"
						>create-scaffa@latest</span
					></pre>
			</CommandLine>
			<p>and then follow the prompt instructions.</p>
		</div>

		<div class="space-y-4">
			<h2 class="text-xl font-medium">Project Name</h2>
			<p>You can specify a project name during installation:</p>
			<CommandLine command={'npx create-scaffa@latest my-project'} class="w-fit mt-1.5">
				<pre><span class="text-cool">npx</span>&nbsp;<span class="text-primary light:text-secondary"
						>create-scaffa@latest</span
					>&nbsp;<span class="text-error">my-project</span></pre>
			</CommandLine>
		</div>

		<div class="space-y-4">
			<h2 class="text-xl font-medium">Template Selection</h2>
			<p>
				Choose a template using the <code class="text-primary light:text-secondary">-t</code> or
				<code class="text-primary light:text-secondary">-template</code> flag:
			</p>
			<CommandLine command={'npx create-scaffa@latest -t react-std'} class="w-fit mt-1.5">
				<pre><span class="text-cool">npx</span>&nbsp;<span class="text-primary light:text-secondary"
						>create-scaffa@latest</span
					>&nbsp;<span class="text-cool">-t</span>&nbsp;<span class="text-primary light:text-secondary">react-std</span
					></pre>
			</CommandLine>
		</div>

		<div class="space-y-4">
			<h2 class="text-xl font-medium">Package Manager</h2>
			<p>
				Select a package manager using <code class="text-primary light:text-secondary">-p</code> or
				<code class="text-primary light:text-secondary">-package</code> flag:
			</p>
			<p class="text-sm">
				Available options: <code class="text-primary light:text-secondary">npm</code> or
				<code class="text-primary light:text-secondary">pnpm</code>
			</p>
			<CommandLine command={'npx create-scaffa@latest -p pnpm'} class="w-fit mt-1.5">
				<pre><span class="text-cool">npx</span>&nbsp;<span class="text-primary light:text-secondary"
						>create-scaffa@latest</span
					>&nbsp;<span class="text-cool">-p</span>&nbsp;<span class="text-primary light:text-secondary">pnpm</span></pre>
			</CommandLine>
		</div>

		<div class="space-y-4">
			<h2 class="text-xl font-medium">Complete Example</h2>
			<p>Combining all options:</p>
			<CommandLine
				command={'npx create-scaffa@latest my-project -t react-std -p pnpm'}
				class="w-fit mt-1.5"
			>
				<pre><span class="text-cool">npx</span>&nbsp;<span class="text-primary light:text-secondary"
						>create-scaffa@latest</span
					>&nbsp;<span class="text-error">my-project</span>&nbsp;<span class="text-cool">-t</span
					>&nbsp;<span class="text-primary light:text-secondary">react-std</span>&nbsp;<span class="text-cool">-p</span
					>&nbsp;<span class="text-primary light:text-secondary">pnpm</span></pre>
			</CommandLine>
		</div>

		<div class="w-full flex justify-between items-center mt-16 space-x-2">
			<NavButton class="w-1/3" type="previous" path="/docs" label="Introduction" />
			<NavButton class="w-1/3" type="next" path="/docs/templates" label="Templates" />
		</div>
	</div>
</section>
