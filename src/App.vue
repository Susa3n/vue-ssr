<template>
  <div id="app">
    <Bar></Bar>
    <Foo></Foo>
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
