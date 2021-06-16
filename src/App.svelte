<script>
	import View from "./router.svelte";
	import { params } from "./store.js";
	import A from "./a.svelte";
	import B from "./b.svelte";
	const routerConfig = {
		"/a": A,
		"/b": B,
		"/a/:id": A,
	};
</script>

<body>
	<a href="/#a">a</a>
	<a href="/#b">b</a>
	<a href="/#a/x">c</a>
	{$params.id}
	<View type="hash" {routerConfig} />
</body>

<style>
	body {
		background: red;
	}
</style>
