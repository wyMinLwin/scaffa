<script lang="ts">
	import { cn } from '$lib/utils';

	let props = $props<{
		type: 'previous' | 'next';
		path: string;
		label: string;
		class?: string;
	}>();
</script>

<button
	aria-label="{props.type} page"
	class={cn([
		'min-w-[150px] sm:min-w-[200px]  px-4 py-2 bg-transparent border border-light/10 light:border-dark/30 text-white rounded-md hover:border-primary transition-all duration-300',
		props.type === 'previous' ? 'text-left' : 'text-right',
		props.class
	])}
>
	<a href={props.path} class="flex flex-col gap-0.5">
		<span class="text-sm font-light text-light/50 light:text-dark/70">
			{#if props.type === 'previous'}
				Previous Page
			{:else}
				Next Page
			{/if}
		</span>
		<span class="text-primary">{props.label}</span>
	</a>
</button>
