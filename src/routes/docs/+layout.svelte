<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import { page } from '$app/stores';

	let routes = $page.route.id?.split('/').slice(1) || [];
</script>

<section class="h-full w-full overflow-hidden flex flex-col">
	<Navbar />
	<div
		class="grow overflow-y-auto container mx-auto md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10"
	>
		<Sidebar />
		<div class="w-full h-full overflow-y-auto pt-4">
			<div class="flex justify-start items-center space-x-1.5 mb-4">
				{#each routes as route, i (i)}
					<span class="capitalize {i === routes.length - 1 ? 'text-light' : 'text-mute'}"
						>{route}</span
					>
					{#if i < routes.length - 1}
						<span class="text-sm font-extralight text-mute">&#62;</span>
					{/if}
				{/each}
			</div>
			<slot />
		</div>
	</div>
</section>
<!--  -->
