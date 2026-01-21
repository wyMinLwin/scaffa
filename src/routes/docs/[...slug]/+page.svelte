<script lang="ts">
	import { tick } from 'svelte';
	import type { PageData } from './$types';
	import NavButton from '$lib/components/NavButton.svelte';

	let { data }: { data: PageData } = $props();

	async function handleCopy(e: Event) {
		const btn = e.currentTarget as HTMLElement;
		const codeBlock = btn.closest('.code-block');
		const code = codeBlock?.getAttribute('data-code');
		if (code) {
			await navigator.clipboard.writeText(decodeURIComponent(code));
			btn.classList.add('copied');
			setTimeout(() => btn.classList.remove('copied'), 2000);
		}
	}

	$effect(() => {
		// Re-run when content changes
		data.content;
		tick().then(() => {
			document.querySelectorAll('.copy-btn').forEach((btn) => {
				btn.removeEventListener('click', handleCopy);
				btn.addEventListener('click', handleCopy);
			});
		});
	});
</script>

<svelte:head>
	<title>{data.metadata.title || 'Documentation'} | Scaffa</title>
	{#if data.metadata.description}
		<meta name="description" content={data.metadata.description} />
	{/if}
</svelte:head>

<section class="w-full space-y-8 tracking-wider font-light">
	<h1 class="text-3xl font-semibold pt-3 pb-8 mb-10 border-b border-light/30">
		{data.metadata.title}
	</h1>
	<div class="prose max-w-none">
		{@html data.content}
	</div>
</section>

<div class="w-full flex justify-between items-center mt-16">
	{#if data.adjacent.previous}
		<NavButton type="previous" path={data.adjacent.previous.path} label={data.adjacent.previous.title} />
	{/if}
	{#if data.adjacent.next}
		<NavButton class="ml-auto" type="next" path={data.adjacent.next.path} label={data.adjacent.next.title} />
	{/if}
</div>
