<script>
	import View from "./router.svelte";
	import { params } from "./store.js";
	import A from "./a.svelte";
	import B from "./b.svelte";
	const routerConfig = {
		"/a": {
			'/b':{'/x':A},
			'/c':B,
			'/d':{'/y':A},
			'/:x':A
		}
	};
</script>

<body>
	<a href="/#a/b/x">a</a>
	<a href="/#a/c">b</a>
	<a href="/#a/d/y">c</a>
	{$params.id}
	<View type="hash" {routerConfig} />
</body>

<style>
	body {
		background: red;
	}
</style>
