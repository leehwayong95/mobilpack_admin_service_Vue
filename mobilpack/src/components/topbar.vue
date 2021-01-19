<template>
  <div id='top'>
    <span>안녕하세요 {{name}}님</span>
    <button type="button" v-on:click="logout" >로그아웃</button>
  </div >
</template>

<script>
export default {
  data () {
    return {
      name: null
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
    },
    logout () {
      this.$cookie.delete('name')
      this.$cookie.delete('token')
      this.$router.push('/')
    }
  }
}
</script>
