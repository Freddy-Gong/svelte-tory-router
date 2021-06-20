
# svelte router

svelte router 是一款专门用于svelter.js的路由管理器。它通过使用svelte.js内部提供的API完成大部分路由功能，让构建单页面应用变得易如反掌。包含的功能有：

1. 嵌套路由
2. 模块化的、基于组件的路由配置
3. 路由参数、查询
4. 细粒度的导航控制
5. HTML5 历史模式或 hash 模式

## 安装
直接通过npm进行下载即可
```bash
npm install svelte-router
```
## 起步

因为该库和svelte深度耦合，所以下面的示例都是在svelte运行环境下进行，请优先配置svelte运行环境
```HTML
<script>
    import View from 'svelte-router'
</script>
<View type="" routerConfig="" />
```
用来展示页面的部分是View标签，她接受两个参数 type 和 routerConfig 。type是用来选择hash模式或者history模式的。routerConfig是一个对象，我们在这里进行路由配置。
```HTML
<script>
    import View from 'svelte-router'
    import A from './componentA'
    import B from './componentB'
    const routerConfig = { //key是路径
        '/a':A,      //value是组件   
        '/b':B
    }
</script>
<a href="/#a" >A</a>
<a href="/#b" >B</a>
<View type="hash" {routerConfig} />
<!-- type = hash | history -->
```
因为这里用的是hash路由，所以我们改变路由的时候要在前面加上#号。我们可以这样显示的通过a标签改变路由，也可以把这种改变封装到组件中，更好看。
### 动态路由匹配

我们经常需要把某种模式匹配到的所有路由，全都映射到同个组件。例如，我们有一个 User 组件，对于所有 ID 各不相同的用户，都要使用这个组件来渲染。那么，我们可以在 svelte-router 的路由路径中使用“动态路径参数”(dynamic segment) 来达到这个效果：

```HTML
<script>
    import View from 'svelte-router'
    import User from './component'
    const routerConfig = { 
        '/user/:id':User,      
    }
</script>
<a href="/#user/foo" >A</a>
<a href="/#user/bar" >B</a>
<View type="hash" {routerConfig} />
```
现在呢，像 /user/foo 和 /user/bar 都将映射到相同的路由。

一个“路径参数”使用冒号 : 标记。当匹配到一个路由时，参数值会被设置到全局变量params中，可以在每个组件内使用。于是，我们可以更新 User 的模板，输出当前用户的 ID：
```HTML
<script>
//User.svelte
    import { params } from "./store.js";
</script>
<h1>{$params.id}<h1>
```
提醒一下，当使用路由参数时，例如从 /user/foo 导航到 /user/bar，原来的组件实例会被复用。因为两个路由都渲染同个组件，比起销毁再创建，复用则显得更加高效。不过，这也意味着组件的生命周期钩子不会再被调用。
### 嵌套路由
实际生活中的应用界面，通常由多层嵌套的组件组合而成。同样地，URL 中各段动态路径也按某种结构对应嵌套的各层组件，例如：
```bash
/user/foo/profile                     /user/foo/posts
+------------------+                  +-----------------+
| User             |                  | User            |
| +--------------+ |                  | +-------------+ |
| | Profile      | |  +------------>  | | Posts       | |
| |              | |                  | |             | |
| +--------------+ |                  | +-------------+ |
+------------------+                  +-----------------+
```
借助 svelte-router，使用嵌套路由配置，就可以很简单地表达这种关系。只需把routerConfig也改成这种关系即
```js
const routerConfig = {
    '/user':{
        '/foo':{
            'profile':A,
            'posts':B
        },
        '/bar':C
    }
}
```
上面的对象的嵌套关系最终会在hashRouter类内部实例化成
```js
{
    '/user/foo/profile':A,
    '/user/foo/ppsts':B,
    '/user/bar':C
}
```


### 重定向和404页面

#### 重定向
重定向也是通过 routeConfig 配置来完成，下面例子是从 /a 重定向到 /b：
```js
const routerConfig ={
    '/a':A,
    '/b':'/a'
}
```
注意导航守卫并没有应用在跳转路由上，而仅仅应用在其目标上。在下面这个例子中，为 /b 路由添加一个 beforeRouterEnter 守卫并不会有任何效果。
#### 404
404也是通过 routeConfig 配置来完成
```js
const routerConfig ={
    '/a':A,
    '/b':'/a',
    'other': component404
}
```


### Histrory模式
如果不想要很丑的 hash，我们可以用路由的 history 模式，这种模式充分利用 history.pushState API 来完成 URL 跳转而无须重新加载页面。不过这种模式下我们需要获得路由跳转标签的父级元素或者跳转标签的索引。
```HTML
<body>
	<div class="container">
		<a href="/a/b/v">a</a>
		<a href="/a/c">b</a>
		<a href="/a/d/y">c</a>
	</div>
	
	{$params.id}
	<View type="history" {routerConfig} historyContainer={container}/>
</body>
```
当你使用 history 模式时，URL 就像正常的 url，例如 http://yoursite.com/user/id，也好看！

不过这种模式要玩好，还需要后台配置支持。因为我们的应用是个单页客户端应用，如果后台没有正确的配置，当用户在浏览器直接访问 http://oursite.com/user/id 就会返回 404，这就不好看了。

所以呢，你要在服务端增加一个覆盖所有情况的候选资源：如果 URL 匹配不到任何静态资源，则应该返回同一个 index.html 页面，这个页面就是你 app 依赖的页面
#### 后端配置例子
nginx
```nginx
//当index.html文件在服务器本地
location / {
  try_files $uri $uri/ /index.html;
}
//index.html 存于远程地址 比如cdn上
http://www.cnd.com/file/index.html
location / {
    rewrite ^ /file/index.html break;
    proxy_pass http://www.cnd.com;
}
```

Node.js
```js
const http = require('http')
const fs = require('fs')
const httpPort = 80

http.createServer((req, res) => {
  fs.readFile('index.html', 'utf-8', (err, content) => {
    if (err) {
      console.log('We cannot open "index.html" file.')
    }

    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8'
    })

    res.end(content)
  })
}).listen(httpPort, () => {
  console.log('Server listening on: http://localhost:%s', httpPort)
})
```
### 导航守卫
正如其名，svelte-router 提供的导航守卫主要用来通过跳转或取消的方式守卫导航。有多种机会植入路由导航过程中：全局的或者组件级的。
#### 全局守卫
全局守卫有两个 全局前置守卫和全局后置守卫，他们是用过一个注册函数来进行注册使用的。
```HTML
<script>
	import {registerGloableGuard} from './routerGuard'
	
	const guard = {
		beforeEach:()=>{
			console.log('beforeEach','gloable')
		},
		afterEach:()=>{
			console.log('afterEach','gloable')
		}
	}
	registerGloableGuard(guard)
</script>
```
这个注册函数接受一个对象，对象中只有两个可选的key beforeEach | afterEach ，value即执行的callback。
#### 组件守卫
组件守卫有三种 分别是 beforeRouteUpdate,beforeRouterEnter,beforeRouterLeave 可分别通过引入的形式进行注册 传入要执行的callback
```HTML
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
```
#### 完整的导航解析流程
1. 导航被触发。
2. 调用全局的 beforeEach 守卫。
3. 调用离开组件的 beforeRouterLeave
4. 调用近入组件的 beforeRouterUpdate
5. 调用近入组件的 beforeRouterEnter
6. 调用全局的 afterEach 钩子。
7. 触发 DOM 更新。

### 路由懒加载
当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就更加高效了。

结合 svelte 的异步组件 (opens new window)和 Webpack 的代码分割功能 (opens new window)，轻松实现路由组件的懒加载。

首先，我们可以使用动态 import (opens new window)语法来定义代码分块点 (split point)
```HTML
<script>
    const Foo = () => import('./Foo.svelte')
</script>
```
在svelte-router内部是通过内置的await块实现异步组件，通过判断传入的组件是不是一个promise来判断是否使用异步组件
```HTML
{#if $tag.component instanceof Promise}
    {#await $tag.component then component}
        <svelte:component this={component} />
    {/await}
{:else}
    <svelte:component this={$tag.component} />
{/if}
```
所以在路由配置中什么都不需要改变，只需要像往常一样使用 Foo：
```js
const routerConfig = {
    '/foo':Foo
}
```
#### 把组件按组分块
有时候我们想把某个路由下的所有组件都打包在同个异步块 (chunk) 中。只需要使用 命名 chunk (opens new window)，一个特殊的注释语法来提供 chunk name (需要 Webpack > 2.4)。
```js
const Foo = () => import(/* webpackChunkName: "group-foo" */ './Foo.vue')
const Bar = () => import(/* webpackChunkName: "group-foo" */ './Bar.vue')
const Baz = () => import(/* webpackChunkName: "group-foo" */ './Baz.vue')
```
Webpack 会将任何一个异步模块与相同的块名称组合到相同的异步块中。