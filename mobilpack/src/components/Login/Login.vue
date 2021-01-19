<template>
    <div class = 'login' id='container'>
        <div class='loginBox'>
            <form>
                <table>
                    <tr><td><input v-model="id" type="text" class="login_txt" placeholder="ID"/></td></tr>
                    <tr><td><input v-model="pw" type="password" class="login_txt" placeholder="PW"/></td></tr>
                </table>
            </form>
            <div class = 'btn_wrap'>
                <button type="button" class="login_btn"  v-on:click="login" style="height: 30px; width: 150px">로그인</button>
            </div>
        </div>
    </div>
</template>

<script>
import modal from '../alert/modal'
export default {
  data () {
    return {
      id: '',
      pw: ''
    }
  },
  methods: {
    login () {
      if (this.id === '' || this.pw === '') {
        this.alert()
      } else {
        this.$axios.post('http://localhost:9000/api/su/my/login', {id: this.id, pw: this.pw})
          .then((res) => {
            if (res.data.status) {
              this.$cookie.set('token', res.data.token)
              this.$cookie.set('name', res.data.name)
              this.$router.push('/main')
            } else {
              this.alert()
            }
          })
          .catch((err) => {
            console.log(err)
            this.alert()
          })
      }
    },
    alert () {
      this.$modal.show(modal, {
        hot_table: 'data',
        modal: this.$modal
      },
      {
        name: 'dynamic-modal',
        width: '330px',
        height: '130px',
        draggable: true
      })
    }
  }
}
</script>

<style>
    @import url('../../assets/css/content');
.btn_wrap {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>
