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
    render.renderToString((err,html) => {
      if(err) reject(err)
      resolve(html)
    })
  })
  // const html =  await render.renderToString() // 如果使用这种形式会导致样式不生效，解决办法使用上面那种回调函数
  // ctx.body = html
})


app.use(router.routes())
app.use(static(path.resolve(__dirname,'dist')))   // 请求静态文件时 根据配置优先在dist文件夹中查找

// 启动服务
app.listen(3000,function() {
  console.log('服务3000端口启动');
})
