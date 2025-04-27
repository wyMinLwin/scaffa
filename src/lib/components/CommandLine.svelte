<script lang="ts">
	import { scale } from 'svelte/transition';

	let copied = false;
	let copyTooltip = 'Copy command';

	let { command } = $$props

	$: {
		if (copied) {
			copyTooltip = 'Copied!';
			setTimeout(() => {
				copied = false;
				copyTooltip = 'Copy command';
			}, 2000);
		}
	}

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
	class="w-full border border-light/10 bg-dark/80 p-4 rounded-lg flex justify-between items-center gap-5 shadow-md relative group"
>
	<slot></slot>
	<div class="w-4 h-4 relative flex items-center justify-center">
		{#if !copied}
			<button
				class="absolute inset-0 flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 rounded transition"
				in:scale={{ duration: 400 }}
				out:scale={{ duration: 400 }}
				on:click={copyCommand}
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
				on:click={copyCommand}
				aria-label={copyTooltip}
				title={copyTooltip}
			>
				<img src="/check.svg" alt="Copied!" class="w-4 h-4 text-success" />
			</button>
		{/if}
	</div>
</code>
