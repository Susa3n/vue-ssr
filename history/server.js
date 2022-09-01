const Koa = require('koa') 
const Router = require('koa-router')
const app = new Koa()
const router = new Router()
const Vue = require('vue')
const VueServerRenderer = require('vue-server-renderer') // 服务端渲染工具包


const path = require('path')
const fs = require('fs')
// 调用fs配合path模块读取模板内容，以便服务端渲染时使用
const template =  fs.readFileSync(path.resolve(__dirname,'./template.html'),'utf-8') 


const vm = new Vue({
  data:{
    name: 'susa3n'
  },
  template:`<div>hello {{name}}</div>`
})  // 拿到实例
router.get('/',async (ctx) => { // 调用服务端渲染的函数，传入对应模板内容，将实例转成字符串添加到模板中
  ctx.body = await VueServerRenderer.createRenderer({template}).renderToString(vm) // 最后将转成的字符出啊按插入到模板的占位符中
})


app.use(router.routes())

app.listen(3000,function(error) {
  if(!error) {
    console.log('监听3000端口');
  }
})