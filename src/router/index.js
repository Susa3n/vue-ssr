import Vue from 'vue'
import VueRouter from 'vue-router'
import Fo from '../compoents/Fo.vue'
Vue.use(VueRouter)


export default () => {
  const routes = [
    {
      path: '/',
      component: Fo,
      name: 'fo'
    },
    {
      path:'/bar',
      name:'bar',
      component: () => import('../compoents/Bar.vue')
    }
  ]
  const router = new VueRouter({
    mode: 'history',
    routes
  })
  return router
}