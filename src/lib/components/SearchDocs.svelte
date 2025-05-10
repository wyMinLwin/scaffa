<script lang="ts">
	import { tick } from 'svelte';

	let inputRef: HTMLInputElement = $state(null!);
	let searchQuery = $state('');

	let isSearchDialogOpen = $state(false);

	function toggleDialog() {
		isSearchDialogOpen = !isSearchDialogOpen;
	}

	async function pressCMD_K(e: KeyboardEvent) {
		if (e.key === 'Escape' && isSearchDialogOpen) {
			toggleDialog();
		}
		if (e.metaKey && e.key === 'k') {
			isSearchDialogOpen = true;
			await tick();
			inputRef.focus();
		}
	}
</script>

<svelte:window onkeydown={pressCMD_K} />

<div>
	<button
		onclick={toggleDialog}
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
			onclick={toggleDialog}
			class="absolute inset-0 bg-black/40 focus-within:outline-0 focus-within:ring-0"
		>
			<div
				aria-label="Search Dialog Content"
				class={`bg-dark border border-light/20 w-11/12 max-w-xl p-2 rounded-2xl absolute top-1/4 -translate-x-1/2 left-1/2 max-h-[450px] flex flex-col ${searchQuery && 'h-full'}`}
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
						placeholder="Search docs..."
						class="h-9 pr-2.5 pl-8 outline-0 ring-0 focus:outline-0 focus:ring-0 w-full text-xl tracking-wide placeholder:tracking-normal font-light"
					/>
				</div>
				{#if searchQuery}
					<hr class="my-1 border-t border-light/30" />
				{/if}
				<div class="w-full relative grow overflow-hidden">
					<div class="h-full overflow-y-auto" aria-label="search results">
						<!-- <div class="h-[500px] bg-red-200"></div>
					<div class="h-[500px] bg-green-200"></div> -->
					</div>
				</div>
			</div>
		</button>
	{/if}
</div>
