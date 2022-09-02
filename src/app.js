import Vue, { h } from 'vue'
import App from './App.vue'
import createRouter from './router/index'
Vue.config.productionTip = false
 

export default () => { // 导出一个函数，服务端进行访问时返回一个新的实例
  const router = createRouter()
  const app = new Vue({
    render: (h) => h(App),
    router
  })
  return {app,router}
}