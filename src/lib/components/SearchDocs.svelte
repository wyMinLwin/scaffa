<script lang="ts">
	import { tick } from 'svelte';
	import { docs } from './Sidebar.svelte';
	import { cn } from '$lib/utils';

	let inputRef: HTMLInputElement = $state(null!);
	let searchQuery = $state('');
	let selectedIndex = $state(0);

	let isSearchDialogOpen = $state(false);

	let searchResults = $derived.by(() => {
		if (!searchQuery) return [];

		return docs.flatMap((group) =>
			group.items.filter((item) => item.title.toLowerCase().includes(searchQuery.toLowerCase()))
		);
	});

	$effect(() => {
		// Reset selected index when search results change
		if (searchResults.length > 0) {
			selectedIndex = 0;
		}
	});

	function toggleDialog() {
		isSearchDialogOpen = !isSearchDialogOpen;
	}

	async function cmdKHandler() {
		isSearchDialogOpen = true;
		await tick();
		inputRef.focus();
	}

	function handleKeydown(e: KeyboardEvent) {
		if (!searchResults.length) return;

		if (e.key === 'ArrowDown') {
			e.preventDefault();
			selectedIndex = (selectedIndex + 1) % searchResults.length;
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			selectedIndex = (selectedIndex - 1 + searchResults.length) % searchResults.length;
		} else if (e.key === 'Enter') {
			e.preventDefault();
			window.location.href = searchResults[selectedIndex].path;
		}
	}

	async function pressCMD_K(e: KeyboardEvent) {
		if (e.key === 'Escape' && isSearchDialogOpen) {
			toggleDialog();
		}
		if (e.metaKey && e.key === 'k') {
			await cmdKHandler();
		}
	}
</script>

<svelte:window onkeydown={pressCMD_K} />

<div>
	<button
		onclick={cmdKHandler}
		class="w-[180px] border-[1px] border-light/10 bg-light/5 rounded-lg h-[38px] pl-3.5 pr-2 flex justify-between items-center"
	>
		<span class="text-sm font-extralight">Search...</span>
		<div
			class=" flex justify-center items-center gap-0.5 px-2 rounded-md border-[1px] border-light/10 shadow-[1px_1px_0px_0px_rgba(247,241,255,0.1)]"
		>
			<img src="/cmd.svg" alt="cmd icon" class="w-2.5 h-2.5 inline-block" />
			<span class="font-light text-[0.89rem]">&nbsp;K</span>
		</div>
	</button>

	{#if isSearchDialogOpen}
		<button
			aria-label="Search Dialog Overlay"
			class="absolute inset-0 bg-black/40 focus-within:outline-0 focus-within:ring-0 z-50"
			onclick={toggleDialog}
		>
			<div
				aria-label="Search Dialog Content"
				onclickcapture={(e) => e.stopImmediatePropagation()}
				class={cn([
					'z-[51] bg-dark border border-light/20 w-11/12 max-w-lg p-2 rounded-lg absolute top-1/4 -translate-x-1/2 left-1/2 max-h-[450px] flex flex-col',
					searchQuery && searchResults.length <= 2 && 'max-h-[200px]',
					searchQuery && 'h-full'
				])}
			>
				<div class="w-full relative grow-0">
					<img
						src="/search.svg"
						alt="cmd icon"
						class="absolute left-1.5 -translate-y-1/2 top-1/2 w-5 h-5 inline-block"
					/>
					<input
						bind:value={searchQuery}
						bind:this={inputRef}
						onkeydown={handleKeydown}
						placeholder="Search docs..."
						class="h-9 pr-2.5 pl-8 outline-0 ring-0 focus:outline-0 focus:ring-0 w-full text-xl tracking-wide placeholder:tracking-normal font-light"
					/>
				</div>
				{#if searchQuery}
					<hr class="my-1 border-t border-light/30" />
					<div class="w-full relative grow overflow-hidden">
						<div class="h-full overflow-y-auto pt-3" aria-label="search results">
							{#if searchResults.length > 0 && searchQuery}
								<ul class="flex flex-col space-y-2">
									{#each searchResults as item, index (item.path)}
										<li
											class={cn([
												'text-sm transition-all duration-300 h-14 rounded-md',
												index === selectedIndex ? 'bg-primary text-dark' : 'text-light bg-light/10'
											])}
											onmouseenter={() => (selectedIndex = index)}
										>
											<a
												href={item.path}
												class="w-full h-full flex justify-between items-center px-3"
											>
												<div class="flex items-center">
													<img
														src={index === selectedIndex ? '/doc-dark.svg' : '/doc-light.svg'}
														alt="doc icon"
														class="w-5 h-5 inline-block mr-1.5"
													/>
													<span class="text-lg font-light tracking-wider">{item.title}</span>
												</div>
												{#if index === selectedIndex}
													<img
														src="/enter-dark.svg"
														alt="enter icon"
														class="w-5 h-5 inline-block"
													/>
												{/if}
											</a>
										</li>
									{/each}
								</ul>
							{:else}
								<div class="text-sm text-light/70 h-full flex justify-center items-center">
									No results found for "{searchQuery}"
								</div>
							{/if}
						</div>
					</div>
				{/if}
			</div>
		</button>
	{/if}
</div>
