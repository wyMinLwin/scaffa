<script>
	import { fade, scale } from 'svelte/transition';

	let copied = false;

	$: {
		if (copied) {
			setTimeout(() => {
				copied = false;
			}, 2000);
		}
	}

	const copyCommand = async () => {
		try {
			await navigator.clipboard.writeText('npx create@makro');
			copied = true;
		} catch (err) {
			console.error('Failed to copy: ', err);
		}
	};
</script>

<svelte:head>
	<title>Frontend Makro</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section
	class="container mx-auto flex flex-col items-center py-10 sm:py-16 md:py-36 space-y-9 sm:space-y-14"
>
	<img src="/logo.svg" alt="Frontend Makro" class="w-16 h-16" />
	<div>
		<h1 class="text-3xl sm:text-6xl font-semibold text-center tracking-wide">Frontend Makro</h1>
		<p class="text-base sm:text-xl text-center py uppercase font-light mt-2">
			All in one pre setup frontend templates
		</p>
	</div>

	<p
		class="w-11/12 sm:w-10/12 md:w-9/12 lg:w-1/2 text-lg sm:text-xl text-center text-pretty font-light"
	>
		With a single command, you can generate a fully-configured Frontend project with all the
		essential libraries you need — saving you time and effort in setting up your development
		environment and you can extend as you want later.
	</p>

	<div class="space-y-2 flex flex-col justify-center items-center">
		<h2 class="text-xl sm:text-2xl text-center tracking-wide">One command is all you need</h2>
		<code
			class="w-[280px] border-[1px] border-light/10 bg-dark py-6 px-4 rounded-lg flex justify-between items-center gap-5"
		>
			<pre><span class="text-error">npx</span>&nbsp;<span class="text-primary">create@makro</span
				></pre>
			<div class="w-4 h-4 relative">
				{#if !copied}
					<button
						class="absolute top-0 left-0 right-0 bottom-0"
						in:scale={{ duration: 600 }}
						out:scale={{ duration: 600 }}
						on:click={copyCommand}
					>
						<img src="/copy.svg" alt="copy" class="w-4 h-4" />
					</button>
				{:else}
					<button
						class="absolute top-0 left-0 right-0 bottom-0"
						in:scale={{ duration: 600 }}
						out:scale={{ duration: 600 }}
						on:click={copyCommand}
					>
						<img src="/check.svg" alt="copy" class="w-4 h-4" />
					</button>
				{/if}
			</div>
		</code>
	</div>

	<div class="grid grid-cols-2 gap-5 w-[270px] sm:w-[420px]">
		<a
			href="/"
			class="col-span-2 sm:col-span-1 border-[1px] border-light/10 gap-3 p-4 rounded-lg flex justify-between items-center transition-all duration-[400ms] hover:scale-105"
			aria-label="Go to Documentations"
		>
			Documentations
			<img src="/arrow.svg" alt="arrow" class="w-5 h-5" />
		</a>
		<a
			href="https://github.com/wyMinLwin/frontend-makro"
			target="_blank"
			class="col-span-2 sm:col-span-1 border-[1px] border-light/10 gap-3 p-4 rounded-lg flex justify-between items-center text-primary transition-all duration-[400ms] hover:scale-105"
			aria-label="Star on GitHub"
		>
			Star on GitHub
			<img src="/star-fill.svg" alt="star" class="w-5 h-5" />
		</a>
	</div>
</section>

<style>
</style>
