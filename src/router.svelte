<script>
    import { tag, globalGuard } from "./store.js";
    import { init ,configGloableGuard} from "./helper";
    export let type = "";
    export let routerConfig = {};
    $: init(type, routerConfig);
    $: configGloableGuard($globalGuard)
</script>

<svelte:component this={$tag.component} />
