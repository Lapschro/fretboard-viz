<script>
	import Header from "./Header.svelte";
	import "../app.css";
</script>

<div class="bg-[#2F4F4F] text-blue-50 w-full h-lvh flex flex-col">
	<Header />

	<main>
		<slot />
	</main>

	<footer></footer>
</div>
