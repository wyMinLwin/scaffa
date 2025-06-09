<script lang="ts">
	import { onMount } from 'svelte';

	let isDarkMode = $state<boolean | undefined>(undefined);

	onMount(() => {
		isDarkMode = localStorage.getItem('scaffa:theme') !== 'light' ? true : false;
	});
	function toggleTheme() {
		isDarkMode = !isDarkMode;
		localStorage.setItem('scaffa:theme', isDarkMode ? 'dark' : 'light');
		document.documentElement.classList.toggle('light', !isDarkMode);
	}
</script>

<button
	onclick={toggleTheme}
	class="w-8 h-8 flex justify-center items-center text-2xl"
>
	{#if isDarkMode === true}
		<i class="icon-[line-md--sunny-outline-to-moon-loop-transition] bg-light"></i>
	{:else if isDarkMode === false}
		<i class="icon-[solar--sun-2-linear] text-[#f2ba02]"></i>
	{:else}
		<i></i>
	{/if}
</button>
