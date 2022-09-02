<template>
  <div >
    <div @click="showAlet">
      foo 事件xxxxxxxxxx
    </div>
  </div>
</template>
<script>
export default {
  name: 'Foo',
  data () {
    return {}
  },
  methods: {
    showAlet() {
      alert('11111')
    }
  }
}
</script>
<style  scoped>
</style>
