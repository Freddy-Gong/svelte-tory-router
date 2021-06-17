<script>
    import { checkParam, getNewKey, resolvePath } from "./clearFunction";
    import { HashRouter, HisoryRouter } from "./class";
    import { params, tag } from "./store.js";
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
        let param;
        Object.keys(routerConfig).forEach((key) => {
            param = checkParam(key);
            if (param) {
                param.forEach((p) => {
                    //wirtable的对象的属性可以直接改？
                    $params[p] = null;
                });
                router.router(
                    getNewKey(key, param),
                    { param, component: routerConfig[key] },
                    true
                );
            } else {
                router.router(key, routerConfig[key]);
            }
        });
    } else {
        throw new Error("请传入routerConfig");
    }
</script>

<div>
    <svelte:component this={$tag.component} />
</div>
