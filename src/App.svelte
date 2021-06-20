<script>
	import View from "./router.svelte";
	import { params } from "./store.js";
	import A from "./a.svelte";
	import B from "./b.svelte";
	import C from "./404.svelte";
	import { onMount } from "svelte";
	const routerConfig = {
		"/a": {
			"/b": {
				"/:id": C,
			},
			"/c": B,
			"/d": { "/y": A },
		},
		"/e": B,
		"/x": "/e",
		other: C,
	};
	let container = null
	onMount(()=>{
		container = document.getElementsByClassName('container')[0]
	})
	 
</script>

<body>
	<div class="container">
		<a href="/a/b/v">a</a>
		<a href="/a/c">b</a>
		<a href="/a/d/y">c</a>
	</div>
	
	{$params.id}
	<View type="history" {routerConfig} historyContainer={container}/>
</body>

<style>
	body {
		background: red;
	}
</style>
