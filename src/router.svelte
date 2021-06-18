<script>
    import { tag, globalGuard } from "./store.js";
    import { init } from "./helper";
    import { beforeEach, afterEach } from "./routerGuard";
    export let type = "";
    export let routerConfig = {};
    $: init(type, routerConfig);
    $: if ($globalGuard.beforeEach) {
        beforeEach($globalGuard.beforeEach);
    }
    $: if ($globalGuard.afterEach) {
        afterEach($globalGuard.afterEach);
    }
</script>

<svelte:component this={$tag.component} />
