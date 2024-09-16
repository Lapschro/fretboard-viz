<script>
	import Header from "./Header.svelte";
	import "../app.css";
</script>

<div class="bg-gray-800 text-blue-50 w-full h-lvh flex flex-col">
	<Header />

	<main>
		<slot />
	</main>

	<footer></footer>
</div>
