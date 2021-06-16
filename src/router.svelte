<script>
    import { checkParam, getNewKey } from "./helper";
    class HashRouter {
        constructor() {
            this.routerMap = {};
            this.routerParamMap = {};
            this.refersh = this.refersh.bind(this);
            window.addEventListener("load", this.refersh);
            window.addEventListener("hashchange", this.refersh);
        }
        router(path, component, param) {
            if (param) {
                this.routerParamMap[path] = component;
            } else {
                this.routerMap[path] = component;
            }
        }
        refersh() {
            const path = `/${location.hash.slice(1)}` || "";
            if (this.routerMap[path]) {
                tag = this.routerMap[path];
            } else {
                this.matchParam(path);
            }
        }
        matchParam(path) {
            const keys = Object.keys(this.routerParamMap);
            for (let i = 0; i < keys.length; i++) {
                if (path.startsWith(keys[i])) {
                    tag = this.routerParamMap[keys[i]].component;
                    params[this.routerParamMap[keys[i]].param] = path
                        .replace(keys[i], "")
                        .slice(1);
                    break;
                }
            }
        }
    }
    class HisoryRouter {}
    let tag;
    let router;
    let params = {};
    let param;
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
            param = checkParam(key);
            if (param) {
                param.forEach((p) => {
                    params[p] = null;
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

{console.log(params, router.routerParamMap)}
<svelte:component this={tag} />
