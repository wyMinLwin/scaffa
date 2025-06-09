<script module>
	export const docs = [
		{
			group: 'Getting Started',
			items: [
				{
					title: 'Introduction',
					path: '/docs'
				},
				{
					title: 'Installation',
					path: '/docs/installation'
				}
			]
		},
		{
			group: 'Guide',
			items: [
				{
					title: 'Templates',
					path: '/docs/templates'
				},
			]
		}
	];
</script>

<script lang="ts">
	import { page } from '$app/state';
	import { cn } from '$lib/utils';

	let currentPath = $state(page.route.id);
	$effect(() => {
		currentPath = page.route.id;
	});
</script>

<aside class="w-full h-full hidden md:block overflow-y-auto pt-4 border-r-[1px] border-light/10 light:border-dark/10">
	{#each docs as group (group.group)}
		<div class="px-4 mb-5 pb-5 last:border-none space-y-2 border-b-[1px] border-light/10 light:border-dark/10">
			<h2 class="text-sm text-light light:text-dark font-base tracking-wider">
				{group.group}
			</h2>
			<ul class="cursor-pointer flex flex-col space-y-1.5">
				{#each group.items as item (item.path)}
					<li
						class={cn([
							'hover:text-primary transition-all text-sm duration-300 text-start tracking-wider',
							currentPath === item.path ? 'text-primary' : 'text-light light:text-dark'
						])}
					>
						<a href={item.path} class="block">
							{item.title}
						</a>
					</li>
				{/each}
			</ul>
		</div>
	{/each}
</aside>
