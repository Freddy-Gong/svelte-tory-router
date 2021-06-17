<script>
    import { tag } from "./store.js";
    import { createRoute, configRouter } from "./helper";
    let router;
    export let type = "";
    export let routerConfig = {};
    $: if (type) {
        router = createRoute(type);
    } else {
        throw new Error("请传入type");
    }

    $: if (Object.keys(routerConfig).length !== 0) {
        router = configRouter(routerConfig, router);
    } else {
        throw new Error("请传入routerConfig");
    }
</script>

<div>
    <svelte:component this={$tag.component} />
</div>
