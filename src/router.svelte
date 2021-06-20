<script>
    import { tag, globalGuard } from "./store.js";
    import { init, configGloableGuard } from "./helper";
    export let type = "";
    export let routerConfig = {};
    export let historyContainer = null;
    $: init(type, routerConfig, historyContainer);
    $: configGloableGuard($globalGuard);
</script>

{#if $tag.component instanceof Promise}
    {#await $tag.component then component}
        <svelte:component this={component} />
    {/await}
{:else}
    <svelte:component this={$tag.component} />
{/if}
