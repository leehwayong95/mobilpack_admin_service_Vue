<template>
  <div id='top'>
      <span>{{route}}</span>
      <span><a v-on:click="editinfo">안녕하세요 {{name}}님</a></span>
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
      if (this.name === '' || this.$cookie.get('authorization') === null) {
        alert('로그인이 필요합니다.')
        this.$router.push('/')
      }
    },
    logout () {
      this.$cookie.delete('name')
      this.$cookie.delete('authorization')
      this.$router.push('/')
    },
    editinfo () {
      this.$router.push('/myinfo')
    }
  }
}
</script>
