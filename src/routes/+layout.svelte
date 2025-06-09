<script lang="ts">
	import type { Snippet } from 'svelte';
	import '../app.css';
	interface Props {
		children?: Snippet;
	}

	let { children }: Props = $props();
</script>

<svelte:head>
	<script>
		document.documentElement.classList.toggle(
			'light',
			localStorage.getItem('scaffa:theme') === 'light'
		);
	</script>
</svelte:head>

<div
	class="app selection:bg-primary/30 font-display w-screen h-svh overflow-hidden"
>
	<main class="h-full overflow-y-auto">
		{@render children?.()}
	</main>
</div>
