<script>
	import CommandLine from '$lib/components/CommandLine.svelte';
</script>

<svelte:head>
	<title>Frontend Makro</title>
	<meta name="description" content="Frontend Makro, All in one pre setup frontend templates" />
	<meta
		name="keywords"
		content="Frontend, Makro, Frontend Makro, UI Templates , Templates, TailwindCSS, Svelte, Vite, React"
	/>
</svelte:head>

<section class="container mx-auto flex flex-col items-center py-10 space-y-8">
	<img src="/logo.svg" alt="Frontend Makro logo" class="w-20 h-20 drop-shadow-lg" />
	<div>
		<h1 class="text-4xl sm:text-6xl font-bold text-center tracking-tight text-light drop-shadow-md">
			Frontend Makro
		</h1>
		<p class="text-base sm:text-xl text-center uppercase font-light mt-3 text-mute tracking-wider">
			All in one pre-setup frontend templates
		</p>
	</div>

	<p
		class="w-11/12 sm:w-10/12 md:w-8/12 lg:w-1/2 text-lg sm:text-xl text-center text-pretty font-light text-light/80"
	>
		With a single command, you can generate a fully-configured frontend project with all the
		essential libraries you need — saving you time and effort in setting up your development
		environment. Extend as you want, whenever you want.
	</p>

	<div class="">
		<h2 class="text-xl sm:text-2xl text-center tracking-wide font-medium text-light/90">
			One command is all you need
		</h2>
		<CommandLine command={'npx create-makro@latest'}>
			<pre class="select-all font-mono"><span class="text-error">npx</span>&nbsp;<span
					class="text-primary">create-makro@latest</span
				></pre>
		</CommandLine>
		<span class="text-xs text-mute mt-1">Click to copy the install command</span>
	</div>

	<div class="w-full max-w-[340px] flex flex-col gap-3 mt-6">
		<a
			href="/docs"
			class="border border-light/10 gap-3 p-4 rounded-lg flex justify-between items-center transition-all duration-300 hover:scale-105 hover:bg-light/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/70"
			aria-label="Go to Documentation"
		>
			<span class="font-medium">Documentation</span>
			<img src="/arrow.svg" alt="arrow" class="w-5 h-5" />
		</a>
		<a
			href="https://github.com/wyMinLwin/frontend-makro"
			target="_blank"
			class="border border-light/10 gap-3 p-4 rounded-lg flex justify-between items-center text-primary transition-all duration-300 hover:scale-105 hover:bg-light/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/70"
			aria-label="Star on GitHub"
		>
			<span class="font-medium">Star the repository on GitHub</span>
			<img src="/star-fill.svg" alt="star" class="w-5 h-5" />
		</a>
	</div>
</section>

<style>
</style>
