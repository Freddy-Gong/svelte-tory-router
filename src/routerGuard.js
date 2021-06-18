import { onMount, onDestroy, beforeUpdate, afterUpdate } from 'svelte'
import { globalGuard } from './store'
export function registerGloableGuard(object) {
    globalGuard.set({ ...globalGuard, ...object })
}
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
export function beforeEach(callback) {
    return beforeUpdate(() => {
        callback()
    })
}
export function afterEach(callback) {
    return afterUpdate(() => {
        callback()
    })
}