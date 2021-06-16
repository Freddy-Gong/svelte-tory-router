<script>
    import { checkParam, getNewKey, resolvePath } from "./helper";
    import { params } from "./store.js";
    let tag;
    let router;
    export let type = "";
    export let routerConfig = {};
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
                if (component !== null && typeof component === "object") {
                    this.constructorChildrenRouter([path], component);
                } else {
                    this.routerMap[path] = component;
                }
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
                    //wirtable的对象的属性可以直接改？
                    $params[this.routerParamMap[keys[i]].param] = path
                        .replace(keys[i], "")
                        .slice(1);
                    break;
                }
            }
        }
        constructorChildrenRouter(pathArray, childrenConfig) {
            if (typeof childrenConfig !== "object") {
                let path = pathArray.join("");
                let param = checkParam(path);
                if (param) {
                    param.forEach((p) => {
                        //wirtable的对象的属性可以直接改？
                        $params[p] = null;
                    });
                    this.router(
                        getNewKey(path, param),
                        {
                            param,
                            component: resolvePath(routerConfig, pathArray),
                        },
                        true
                    );
                } else {
                    this.routerMap[path] = childrenConfig;
                }
                return;
            }
            Object.keys(childrenConfig).forEach((key) => {
                pathArray.push(key);
                this.constructorChildrenRouter(pathArray, childrenConfig[key]);
                pathArray.pop();
            });
            return;
        }
    }
    class HisoryRouter {}
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

{console.log(router.routerMap, router.routerParamMap)}
<svelte:component this={tag} />
