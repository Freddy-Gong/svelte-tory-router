import { params, tag } from "./store.js";
import { checkParam, getNewKey, resolvePath } from './clearFunction'

class BaseRouter {
    matchParam(path) {
        const keys = Object.keys(this.routerParamMap);
        for (let i = 0; i < keys.length; i++) {
            if (path.startsWith(keys[i])) {
                tag.set({ ...tag, component: this.routerParamMap[keys[i]].component })
                params.set({
                    ...params,
                    [this.routerParamMap[keys[i]].param]: path
                        .replace(keys[i], "")
                        .slice(1)
                })
                return;
            }
        }
        if (this.routerMap["other"]) {
            // tag = this.routerMap["other"];
            tag.set({ ...tag, component: this.routerMap["other"] })
        } else {
            throw new Error("无匹配路由");
        }
    }
    constructorChildrenRouter(pathArray, childrenConfig) {
        if (typeof childrenConfig !== "object") {
            let path = pathArray.join("");
            let param = checkParam(path);
            if (param) {
                param.forEach((p) => {
                    //wirtable的对象的属性可以直接改？
                    // $params[p] = null;
                    params.set({ ...params, [p]: null })
                });
                this.router(
                    getNewKey(path, param),
                    {
                        param,
                        component: resolvePath(this.routerConfig, pathArray),
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
    findComponent(path){
        if (
            this.routerMap[path] &&
            typeof this.routerMap[path] !== "string"
        ) {
            tag.set({ ...tag, component: this.routerMap[path] })
        } else if (typeof this.routerMap[path] === "string") {
            tag.set({ ...tag, component: this.routerMap[this.routerMap[path]] })
        } else {
            this.matchParam(path);
        }
    }
}

export class HashRouter extends BaseRouter{
    constructor(routerConfig) {
        super()
        this.routerMap = {};
        this.routerParamMap = {};
        this.refersh = this.refersh.bind(this);
        this.routerConfig = routerConfig
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
        this.findComponent(path)
        
    }
}

export class HisoryRouter extends BaseRouter{
    constructor(routerConfig) {
        super()
        this.routerMap = {};
        this.routerParamMap = {};
        this.routerConfig = routerConfig
        this.init(location.pathname);
        this._bindPopState();
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
    init(path) {
        window.history.replaceState({ path }, null, path);
        // tag = this.routerMap[path];
        tag.set({ ...tag, component: this.routerMap[path] })
    }
    go(path) {
        window.history.pushState({ path }, null, path);
        this.findComponent(path)
    }
    _bindPopState() {
        window.addEventListener("popstate", (e) => {
            const path = e.state && e.state.path;
            this.findComponent(path)
        });
    }
}