<script lang="ts">
	import { page } from '$app/state';
	import { cn } from '$lib/utils';

	const data = [
		{
			title: 'Introduction',
			path: '/docs'
		},
		{
			title: 'Installation',
			path: '/docs/installation'
		}
	];

	let currentPath = $state(page.route.id);
	$effect(() => {
		currentPath = page.route.id;
	});
</script>

<aside class="w-full h-full hidden md:block overflow-y-auto pt-4 border-r-[1px] border-light/10">
	<ul class="cursor-pointer px-4 flex flex-col space-y-3">
		{#each data as item (item.path)}
			<li
				class={cn([
					'hover:text-primary transition-all text-sm duration-300 text-start tracking-wider',
					currentPath === item.path ? 'text-primary' : 'text-light'
				])}
			>
				<a href={item.path} class="block">
					{item.title}
				</a>
			</li>
		{/each}
	</ul>
</aside>
