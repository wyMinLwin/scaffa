<script>
	import { fade } from 'svelte/transition';

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

<section class="container mx-auto flex flex-col items-center pt-10 sm:pt-20 md:pt-36 space-y-14">
	<img src="/logo.svg" alt="Frontend Makro" class="w-16 h-16" />
	<div>
		<h1 class="text-3xl sm:text-6xl font-semibold text-center tracking-wide">Frontend Makro</h1>
		<p class="text-sm sm:text-lg text-center py uppercase font-light mt-2">
			All in one pre setup frontend templates
		</p>
	</div>

	<div class="space-y-4 flex flex-col justify-center items-center">
		<h2 class="sm:text-xl font-medium text-center tracking-wide">One command is all you need</h2>
		<code
			class="w-[270px] border-[1px] border-light/10 bg-dark p-5 rounded-lg flex justify-between items-center gap-5"
		>
			<pre><span class="text-error">npx</span>&nbsp;<span class="text-primary">create@makro</span
				></pre>
			{#if !copied}
			<button on:click={copyCommand}>
				<img src="/copy.svg" alt="copy" class="w-4 h-4" />
			</button>
			{:else}
			<button on:click={copyCommand}>
				<img src="/check.svg" alt="copy" class="w-4 h-4" />
			</button>
			{/if}
		</code>
	</div>

</section>

<style>
</style>
