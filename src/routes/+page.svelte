<script>
	import CommandLine from '$lib/components/CommandLine.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import NavButton from '$lib/components/NavButton.svelte';
</script>

<svelte:head>
	<title>Scaffa</title>
	<meta name="description" content="Scaffa, All in one pre setup frontend templates" />
	<meta
		name="keywords"
		content="Frontend, scaffa, Scaffa, UI Templates , Templates, TailwindCSS, Svelte, Vite, React"
	/>
</svelte:head>

<div class="fixed top-0 left-0 w-full z-50 backdrop-blur-lg">
	<Navbar />
</div>
<section class="container mx-auto flex flex-col items-center pb-10 space-y-8 pt-24">
	<img src="/logo.svg" alt="Scaffa logo" class="w-20 h-20 select-none" />
	<div>
		<h1 class="text-4xl sm:text-6xl font-bold text-center drop-shadow-md">Scaffa</h1>
		<p
			class="text-base sm:text-xl text-center uppercase font-light mt-3 text-mute light:text-dark/70 tracking-wider"
		>
			All in one pre-setup frontend templates
		</p>
	</div>

	<p
		class="w-11/12 sm:w-10/12 md:w-8/12 lg:w-1/2 text-lg sm:text-xl text-center text-pretty font-light text-light/80 light:text-dark/80 tracking-wide"
	>
		With a single command, you can generate a fully-configured frontend project with all the
		essential libraries you need — saving you time and effort in setting up your development
		environment. Extend as you want, whenever you want.
	</p>

	<div class="">
		<h2
			class="text-xl sm:text-2xl text-center tracking-wide font-medium text-light/90 light:text-dark/90"
		>
			One command is all you need
		</h2>
		<CommandLine command={'npx create-scaffa@latest'}>
			<pre class="select-all font-mono"><span class="text-cool">npx</span>&nbsp;<span
					class="text-primary light:text-secondary">create-scaffa@latest</span
				></pre>
		</CommandLine>
		<span class="text-xs text-mute light:text-dark/70 mt-1">Click to copy the install command</span>
	</div>

	<div class="w-full max-w-[340px] flex flex-col gap-3 mt-3">
		<a
			href="/docs"
			class="border border-light/10 light:border-dark/10 gap-3 p-4 rounded-lg flex justify-between items-center transition-all duration-300 hover:scale-105 hover:bg-light/5 hover:light:bg-dark/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/70"
			aria-label="Go to Documentation"
		>
			<span class="font-medium">Documentation</span>
			<!-- <img src="/arrow.svg" alt="arrow" class="w-5 h-5" /> -->
			<i class="icon-[material-symbols--arrow-outward-rounded] text-light light:text-dark text-xl"
			></i>
		</a>
		<a
			href="https://github.com/wyMinLwin/Scaffa"
			target="_blank"
			class="border border-light/10 light:border-dark/10 text-primary light:text-dark gap-3 p-4 rounded-lg flex justify-between items-center transition-all duration-300 hover:scale-105 hover:bg-light/5 hover:light:bg-dark/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/70"
			aria-label="Star on GitHub"
		>
			<span class="font-medium">Star the repository on GitHub</span>
			<i class="icon-[material-symbols--star-rounded] text-primary light:text-dark text-xl"></i>
			<!-- <img src="/star-fill.svg" alt="star" class="w-5 h-5" /> -->
		</a>
	</div>
</section>

<style>
</style>
