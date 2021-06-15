<script>
    class HashRouter {
        constructor() {
            this.routerMap = {};
            this.refersh = this.refersh.bind(this);
            window.addEventListener("load", this.refersh);
            window.addEventListener("hashchange", this.refersh);
        }
        router(path, component) {
            this.routerMap[path] = component;
        }
        refersh() {
            const path = `/${location.hash.slice(1)}` || "";
            tag = this.routerMap[path];
        }
    }
    class HisoryRouter {}
    let tag
    let router;
    export let type = "";
    export let routerConfig = {};
    $: if (type) {
        if (type !== "history" && type !== "hash") {
            throw new Error("路由模式只有hash和history两个选项");
        }
        if (type === "hash") {
            router = new HashRouter();
        }
        if (type === "history") {
            router = new HisoryRouter();
        }
    } else {
        throw new Error("请传入type");
    }
    $: if (Object.keys(routerConfig).length !== 0) {
        Object.keys(routerConfig).forEach((key) => {
            router.router(key, routerConfig[key]);
        });
    } else {
        throw new Error("请传入routerConfig");
    }
</script>
<svelte:component this={tag} />
