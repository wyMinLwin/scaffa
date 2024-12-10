<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
</script>

<section class="h-full w-full overflow-hidden flex flex-col">
	<Navbar />
	<div
		class="grow overflow-y-auto container mx-auto md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10"
	>
		<Sidebar />
		<div class="w-full h-full overflow-y-auto pt-4">
			<slot />
		</div>
	</div>
</section>
<!--  -->
