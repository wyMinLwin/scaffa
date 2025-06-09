<script>
	import GitHub from './GitHub.svelte';
import SearchDocs from './SearchDocs.svelte';
	import ThemeToggle from './ThemeToggle.svelte';
</script>

<nav
	class=" border-b-[1px] border-light/10 light:border-dark/10 h-14 px-4 py-2 grow-0 flex justify-between items-center shrink-0"
>
	<a href="/" class=" flex justify-center items-center">
		<img src="/logo.svg" alt="Scaffa" class="w-5 h-5 inline-block mr-2 drop-shadow-2xl" />
		<p class="text-xl text-center drop-shadow-md">Scaffa</p>
	</a>
	<div class="flex items-center gap-3">
		<SearchDocs /> 
		<div class="w-px h-5 bg-light/10 light:bg-dark/10"></div>
		<GitHub />
		<div class="w-px h-5 bg-light/10 light:bg-dark/10"></div>
		<ThemeToggle />
	</div>
</nav>
