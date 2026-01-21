<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import { page } from '$app/state';
	import type { LayoutData } from './$types';

	interface Props {
		children?: import('svelte').Snippet;
		data: LayoutData;
	}

	let { children, data }: Props = $props();

	function getRoutes(pathname: string): string[] {
		const parts = pathname.split('/').filter(Boolean);
		return parts.map((part) =>
			part
				.replace(/-/g, ' ')
				.replace(/\b\w/g, (c) => c.toUpperCase())
		);
	}

	let routes = $state(getRoutes(page.url.pathname));

	$effect(() => {
		routes = getRoutes(page.url.pathname);
	});
</script>

<section class="h-full w-full overflow-hidden flex flex-col">
	<Navbar navigation={data.navigation} />
	<div
		class="grow overflow-y-auto w-full md:grid md:grid-cols-[200px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-10"
	>
		<Sidebar navigation={data.navigation} />
		<div class="w-full h-full overflow-y-auto p-4 md:p-0 md:py-4 md:pr-4">
			<div class="flex justify-start items-center space-x-1.5 mb-4">
				{#each routes as route, i (i)}
					<span class="capitalize {i === routes.length - 1 ? 'text-light light:text-dark' : 'text-mute'}"
						>{route}</span
					>
					{#if i < routes.length - 1}
						<span class="text-sm font-extralight text-mute">&#62;</span>
					{/if}
				{/each}
			</div>

			{@render children?.()}
		</div>
	</div>
</section>
