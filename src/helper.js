import { HashRouter, HisoryRouter } from './class'
import { params } from "./store.js";
export function checkParam(key) {
    const reg = /(?<=\/:)[\w]+/g;
    const result = key.match(reg);
    return result;
}
export function getNewKey(key, param) {
    if (param.length === 1) {
        const index = key.indexOf(param[0])
        return key.substring(0, index - 2)
    }
}
export function resolvePath(config, pathArray) {
    let result = config
    pathArray.forEach((path) => {
        result = result[path]
    })
    return result
}

export function createRoute(type) {
    let router
    if (type !== "history" && type !== "hash") {
        throw new Error("路由模式只有hash和history两个选项");
    }
    if (type === "hash") {
        router = new HashRouter();
    }
    if (type === "history") {
        router = new HisoryRouter();
    }
    return router
}

export function configRouter(routerConfig, router) {
    let param;
    Object.keys(routerConfig).forEach((key) => {
        param = checkParam(key);
        if (param) {
            param.forEach((p) => {
                //wirtable的对象的属性可以直接改？
                // $params[p] = null;
                // params[p] = null
                params.set({...params,[p]:null})
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
}