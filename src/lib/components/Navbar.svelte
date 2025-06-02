<script>
	import SearchDocs from './SearchDocs.svelte';
</script>

<nav
	class=" border-b-[1px] border-light/10 h-14 px-4 py-2 grow-0 flex justify-between items-center"
>
	<a href="/" class=" flex justify-center items-center">
		<img src="/logo.svg" alt="Scaffa" class="w-5 h-5 inline-block mr-2" />
		<p class="text-xl tracking-wide">Scaffa</p>
	</a>
	<SearchDocs />
</nav>
