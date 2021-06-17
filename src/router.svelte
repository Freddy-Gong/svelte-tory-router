<script>
    import { tag } from "./store.js";
    import { init } from "./helper";
    export let type = "";
    export let routerConfig = {};
    $: init(type, routerConfig);
</script>

<svelte:component this={$tag.component} />
