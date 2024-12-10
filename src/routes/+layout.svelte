<script>
	// import Navbar from '$lib/components/Navbar.svelte';
	import '../app.css';
</script>

<div class="app font-display bg-bg text-light w-screen h-svh overflow-hidden">
	<main class="h-full overflow-y-auto">
		<!-- <Navbar /> -->
		<slot />
	</main>
</div>

<style>
</style>
