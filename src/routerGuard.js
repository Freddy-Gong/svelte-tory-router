import { onMount, onDestroy, beforeUpdate } from 'svelte'
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

