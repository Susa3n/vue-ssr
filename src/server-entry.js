// 服务端渲染入口
import createApp from './app'


// 此函数在服务端渲染使用
export default () => { // 服务端渲染：不同的用户向后台服务发送请求，每次都要产生一个新的应用实例否则就会共用
  console.log('xxxx');
  const {app} = createApp() // 每次都能产生一个新的应用实例
  return app
}