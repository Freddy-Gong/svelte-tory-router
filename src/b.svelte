<script>
    import {beforeRouteUpdate,beforeRouterEnter,beforeRouterLeave} from './routerGuard'
    beforeRouteUpdate(()=>{
        console.log('beforeRouteUpdate','b')
    })
    beforeRouterEnter(()=>{
        console.log('beforeRouterEnter','b')
    })
    beforeRouterLeave(()=>{
        console.log('beforeRouterLeave','b')
    })
</script>

<h1>b 页面</h1>