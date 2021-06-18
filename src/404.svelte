<script>
    import {beforeRouteUpdate,beforeRouterEnter,beforeRouterLeave} from './routerGuard'
    beforeRouteUpdate(()=>{
        console.log('beforeRouteUpdate','404')
    })
    beforeRouterEnter(()=>{
        console.log('beforeRouterEnter','404')
    })
    beforeRouterLeave(()=>{
        console.log('beforeRouterLeave','404')
    })
</script>
<h1>404</h1>