<template>
    <div class = 'login' id='container'>
        <div class='login_logo'>
        </div>
        <div class='loginBox'>
            <form >
                <table>
                    <td><input type="text" class="login_txt" placeholder="ID"/></td>
                    <td><input type="password" class="login_txt" placeholder="PW"/></td>
                </table>
            </form>
            <div>
                <button type="button" class="login_btn"  v-on:click="routerpush">로그인</button>
            </div>
            </div>
    </div>
</template>

<script>
export default {
  methods: {
    routerpush () {
      this.$router.push('/details')
    }
  }
}
</script>

<style>
    @import url('../../assets/css/content');
</style>
