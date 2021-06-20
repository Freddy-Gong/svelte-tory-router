import View from './router.svelte'
import { params, tag, globalGuard } from './store'
import { registerGloableGuard, beforeRouterLeave, beforeRouteUpdate, beforeRouterEnter } from './routerGuard'
export { View,params, tag, globalGuard,registerGloableGuard, beforeRouterLeave, beforeRouteUpdate, beforeRouterEnter }