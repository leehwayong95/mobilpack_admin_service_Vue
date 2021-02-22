<template>
    <div class='login' id='container'>
      <div class='loginBox'>
        <div class="login_logo">
          관광지 추천<br>관리자 시스템
        </div>
        <table>
            <tr><td><input v-model="id" type="text" class="login_txt" placeholder="ID"/></td></tr>
            <tr><td><input v-model="pw" type="password" class="login_txt" placeholder="PW" v-on:keyup.enter="login"/></td></tr>
        </table>
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
              this.$axios.defaults.headers.common['authorization'] = res.data['jwt-token']
              this.$cookie.set('authorization', res.data['jwt-token'])
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
.btn_wrap {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>
