import { HashRouter, HisoryRouter } from './class'
import { params } from "./store.js";
import { checkParam } from './clearFunction'
import { beforeUpdate, afterUpdate } from 'svelte'
export function init(type, routerConfig, container) {
    if (type && Object.keys(routerConfig).length !== 0) {
        createRoute(type, routerConfig, container);
    } else if (Object.keys(routerConfig).length !== 0 && !type) {
        throw new Error("请传入type");
    } else {
        throw new Error("请传入routerConfig");
    }
}

function createRoute(type, routerConfig, container) {
    let router
    if (type !== "history" && type !== "hash") {
        throw new Error("路由模式只有hash和history两个选项");
    }
    if (type === "hash") {
        router = new HashRouter(routerConfig);
        configRouter(routerConfig, router)
    }
    // if (type === "history" && !container) {
    //     throw new Error('请传入路由的容器')
    // }
    if (type === "history" && container) {
        router = new HisoryRouter(routerConfig);
        configRouter(routerConfig, router)
        container.addEventListener('click',e=>{
            if(e.target.tagName === 'A'){
                e.preventDefault()
                router.go(e.target.getAttribute('href'))
            }
        })
    }
    return router
}

function configRouter(routerConfig, router) {
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

export function configGloableGuard(globalGuard) {
    if (globalGuard.beforeEach) {
        beforeEach(globalGuard.beforeEach);
    }
    if (globalGuard.afterEach) {
        afterEach(globalGuard.afterEach);
    }
}

function beforeEach(callback) {
    return beforeUpdate(() => {
        callback()
    })
}
function afterEach(callback) {
    return afterUpdate(() => {
        callback()
    })
}

