import { HashRouter, HisoryRouter } from './class'
import { params } from "./store.js";
import { checkParam } from './clearFunction'

export function init(type, routerConfig) {
    if (type && Object.keys(routerConfig).length !== 0) {
        createRoute(type, routerConfig);
    } else if (Object.keys(routerConfig).length !== 0 && !type) {
        throw new Error("请传入type");
    } else {
        throw new Error("请传入routerConfig");
    }
}

export function createRoute(type, routerConfig) {
    let router
    if (type !== "history" && type !== "hash") {
        throw new Error("路由模式只有hash和history两个选项");
    }
    if (type === "hash") {
        router = new HashRouter(routerConfig);
        configRouter(routerConfig, router)
    }
    if (type === "history") {
        router = new HisoryRouter(routerConfig);
        configRouter(routerConfig, router)
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
                params.set({ ...params, [p]: null })
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