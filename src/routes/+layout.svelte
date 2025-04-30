<script lang="ts">
	import '../app.css';
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<div class="app font-display bg-bg text-light w-screen h-svh overflow-hidden">
	<main class="h-full overflow-y-auto">
		{@render children?.()}
	</main>
</div>
