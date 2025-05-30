<script lang="ts">
	import { cn } from '$lib/utils';
	import { scale } from 'svelte/transition';
	interface Props {
		children?: import('svelte').Snippet;
		class?: string;
		command: string;
	}

	let { ...props }: Props = $props();

	let copied = $state(false);
	let copyTooltip = $state('Copy command');

	let { command } = props;

	$effect(() => {
		if (copied) {
			copyTooltip = 'Copied!';
			setTimeout(() => {
				copied = false;
				copyTooltip = 'Copy command';
			}, 2000);
		}
	});

	// Copies the install command to clipboard and provides feedback
	const copyCommand = async () => {
		try {
			await navigator.clipboard.writeText(command);
			copied = true;
		} catch (err) {
			console.error('Failed to copy: ', err);
		}
	};
</script>

<code
	class={cn([
		'w-full max-w-full min-w-0 border border-light/10 bg-dark/80 p-3.5 md:p-4 rounded-md sm:rounded-lg flex justify-between items-center gap-3.5 md:gap-5 shadow-md relative group',
		'overflow-x-auto whitespace-pre-line', // Add these classes
		props.class
	])}
>
	<p class="text-sm sm:text-base grow min-w-0 cli-wrapper">
		{@render props.children?.()}
	</p>
	<div class="w-4 h-4 relative flex items-center justify-center grow-0 shrink-0">
		{#if !copied}
			<button
				class="absolute inset-0 flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 rounded transition"
				in:scale={{ duration: 400 }}
				out:scale={{ duration: 400 }}
				onclick={copyCommand}
				aria-label={copyTooltip}
				title={copyTooltip}
			>
				<img
					src="/copy.svg"
					alt="Copy command"
					class="w-4 h-4 opacity-80 group-hover:opacity-100 transition"
				/>
			</button>
		{:else}
			<button
				class="absolute inset-0 flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 rounded animate-pulse"
				in:scale={{ duration: 400 }}
				out:scale={{ duration: 400 }}
				onclick={copyCommand}
				aria-label={copyTooltip}
				title={copyTooltip}
			>
				<img src="/check.svg" alt="Copied!" class="w-4 h-4 text-success" />
			</button>
		{/if}
	</div>
</code>
