<script>
	import View from "./router.svelte";
	import A from './a.svelte'
	import B from './b.svelte'
	const routerConfig = {
		'/a':A,
		'/b':B
	}
</script>
<style>
	body {
		background: red;
	}
</style>
<body >
	<a href="/#a">a</a>
	<a href="/#b">b</a>
	<View type='hash' {routerConfig}/>
</body>


