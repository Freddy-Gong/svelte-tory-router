<script>
    import { tag } from "./store.js";
    import { createRoute } from "./helper";
    export let type = "";
    export let routerConfig = {};
    $: if (type && Object.keys(routerConfig).length !== 0) {
        createRoute(type, routerConfig);
    } else if (Object.keys(routerConfig).length !== 0 && !type) {
        throw new Error("请传入type");
    } else {
        throw new Error("请传入routerConfig");
    }
</script>

<div>
    <svelte:component this={$tag.component} />
</div>
