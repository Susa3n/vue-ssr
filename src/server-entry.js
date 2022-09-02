// 服务端渲染入口
import createApp from './app'


// 此函数在服务端渲染使用
export default ({url}) => { // 服务端渲染：不同的用户向后台服务发送请求，每次都要产生一个新的应用实例否则就会共用
  // const {app,router} = createApp() // 每次都能产生一个新的应用实例
  // router.push({path:`${url}`})
  // return app
  // 首次进入页面，会执行此函数，之后在页面上点击跳转路由和后端没有关联
  // 刷新页面和后端建立联系，render的renderToString函数内部会调用此函数
  return new Promise((resolve,reject) => {
    let {app,router} = createApp() // 拿到新的应用实例以及路由器实例
    router.push({path: url}) // 路由当前路由路径先进行跳转，路由路径是后端通过enderToString函数传递过来
    router.onReady(() => { // 有可能根据当前路由路径匹配到的路由组件是异步路由，需要将异步路由加载完毕后在返回实例
      const matchedComponents = router.getMatchedComponents() // 获取当前路由路径匹配到的路由组件
      if(matchedComponents.length == 0) { // 如果没有匹配到，说明当前路由系统没有此路由 返回404
        return reject({code: 404}) // 后续根据状态吗后端展示页面
      }else {
        resolve(app) // 匹配到将应用实例返回，后端根据应用实例生产html字符串内容
      }
    })
  })
}