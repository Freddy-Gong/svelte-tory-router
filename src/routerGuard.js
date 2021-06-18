import { onMount, onDestroy, beforeUpdate, afterUpdate } from 'svelte'
export function registerGuard(guardName, callback, component) { }
export function beforeRouterLeave(callback) {
    return onDestroy(() => {
        callback()
    })
}
export function beforeRouteUpdate(callback) {
    return beforeUpdate(() => {
        callback()
    })
}
export function beforeRouterEnter(callback) {
    return onMount(() => {
        callback()
    })
}
//全局
export function beforeEach(callback){
    return beforeUpdate(()=>{
        callback()
    })
}
export function afterEach(callback){
    return afterUpdate(()=>{
        callback()
    })
}