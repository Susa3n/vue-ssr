const Koa = require('koa')
const Router = require('koa-router')
const VueServerRenderer = require('vue-server-renderer')

const path = require('path')
const fs = require('fs')

const template = fs.readFileSync(path.resolve(__dirname,'./dist/server.html'),'utf-8') // 服务端模板
const serverBundle = fs.readFileSync(path.resolve(__dirname,'./dist/server.bundle.js'),'utf-8') // 服务端打包后的js文件

const app = new Koa()
const router = new Router()


const static = require('koa-static') // 请求静态文件时 根据配置优先查找


// 根据VueServerRenderer的createBundleRenderer函数，传入打包后的js文件以及template，生产一个render对象
// render对象中renderToString函数，接收一个回调函数，将服务端打包后的js以及template编译成字符串
const render = VueServerRenderer.createBundleRenderer(serverBundle,{ 
  template
})

router.get('/',async (ctx) => {
  ctx.body = await new Promise((resolve,reject) => { // 插入到页面中
    render.renderToString({url:'/'},(err,html) => { // 调用服务端渲染的函数，可以传入参数，拿到回调函数拿到结果
      if(err) reject(err) 
      resolve(html)
    })
  })
  // const html =  await render.renderToString() // 如果使用这种形式会导致样式不生效，解决办法使用上面那种回调函数
  // ctx.body = html
})

router.get('/(.*)',async (ctx) => { // 匹配刷新页面的路由路径，所有的路径都会从此函数进入
  ctx.body = await new Promise((resolve,reject) => { // 插入到页面中
    render.renderToString({url:ctx.url},(err,html) => { // 根据请求的api,调用服务端渲染函数，拿到对应的执行结果返回对应界面
      if(err && err.code == 404 ) { 
        resolve('not Found')
      }else {
       resolve(html)
      }
    })
  })
})
app.use(static(path.resolve(__dirname,'dist')))   // 请求静态文件时 根据配置优先在dist文件夹中查找（这里放在首位的原因是因为前端路由是通过懒加载进行打包，会打包出js文件，路径匹配到发起请求）
app.use(router.routes()) // 如果查不到的化 再进入后端路由系统

// 启动服务
app.listen(3000,function() {
  console.log('服务3000端口启动');
})
