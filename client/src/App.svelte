<script>
	// export let name;
	import Navbar from './components/Navbar.svelte';
	import Card from './components/Card.svelte';
	
	import { onMount } from 'svelte';
  	import { getContent, updateCount } from "./content";

	let contentList = [];

	// Get the data from the api, after the page is mounted.
	onMount(async () => {
		const res = await getContent();
		contentList = res;
	});

	async function handleClick() {
		const res = await getContent();
		contentList = res;
		contentList = contentList.sort(function(a, b){return b.amount_click - a.amount_click});
	}
</script>

<main>
	<Navbar/>
	<div class="contentList">
		{#each contentList as { title, description, image_source, amount_click, id }, i}
			<Card on:message={handleClick} bind:title={title} imageSource={image_source} description={description} v={amount_click} i={id}/>
		{/each}
	</div>
</main>

<style>
	main{
		background-color: white;
		max-width:600px;
		margin: 0px auto;
		align-items: center;
	}
	.contentList{
		background-color: beige;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		text-align: center;
		justify-content: center;
	}
</style>