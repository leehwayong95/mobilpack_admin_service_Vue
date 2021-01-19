<template>
  <div id='top'>
      <span>{{route}}</span>
      <span><a>안녕하세요 {{name}}님</a></span>
      <button type="button" v-on:click="logout" >로그아웃</button>
  </div >
</template>

<script>
export default {
  data () {
    return {
      name: null,
      route: null
    }
  },
  mounted () {
    this.getName()
  },
  methods: {
    getName () {
      this.name = this.$cookie.get('name')
      if (this.name === null || this.$cookie.get('token') === null) {
        this.$router.push('/')
      }
      this.route = this.$route.fullPath.substring(1).replace('/', '>')
      // mounted라 한번밖에 실행안됨 고쳐야함
    },
    logout () {
      this.$cookie.delete('name')
      this.$cookie.delete('token')
      this.$router.push('/')
    }
  }
}
</script>
