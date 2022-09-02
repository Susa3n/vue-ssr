<template>
  <div id="app">
    <router-link to='/'>fo</router-link>
    <router-link to='/bar'>bar</router-link>
    <hr>
    <hr>
    <hr>
    <router-view></router-view>
  </div>
</template>
<script>
import Bar from './compoents/Bar.vue';
import Foo from './compoents/Fo.vue'
export default {
  name: 'App',
  data () {
    return {}
  },
  components: {Bar,Foo }
}
</script>
<style lang='less' scoped>
</style>
