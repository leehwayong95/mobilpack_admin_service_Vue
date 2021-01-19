<template>
  <div id="app">
      <router-view/>
      <router-view name="top"/>
      <router-view name="left"/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      login: null
    }
  },
  mounted () {
    this.login = this.$route.name
  }
}
</script>

<style>
  @import url('./assets/css/reset');
  @import url('./assets/css/vue-sidebar-menu');
  @import url('./assets/css/content');
  @import url('./assets/css/common');
  @import url('./assets/css/style');
</style>
