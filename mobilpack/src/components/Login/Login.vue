<template>
    <div class='login' id='container'>
      <div class='loginBox'>
        <div class="login_logo">
          관광지 추천<br>관리자 시스템
        </div>
        <div class="login_form">
          <span>아이디</span>
          <input v-model="id" type="text" class="login_txt" placeholder="ID"/>
          <span>비밀번호</span>
          <input v-model="pw" type="password" class="login_txt" placeholder="PW" v-on:keyup.enter="login"/>
          <div class = 'btn_wrap'>
            <button type="button" class="login_btn"  v-on:click="login">로그인</button>
          </div>
        </div>
        <span>신규 계정 발급 또는 기존 계정의 비밀번호를 잊은 경우, <br>담당 관리자에게 문의바랍니다.</span>
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
        draggable: false
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
.btn_wrap button {
  height: 30px;
  width: 100%;
}
div.login_form {
  border: solid 1px #999;
  padding: 50px 30px;
}
div.login_form span{
  font-weight: bold;
}
div.login_form input{
  margin-top: 10px;
  margin-bottom: 20px;
}
.login_logo {
  text-align: center;
  font-size: 50px;
  font-weight: bold;
  color: #999;
  padding-bottom: 30px;
}
.loginBox > span{
  display: flex;
  justify-content: center;
  text-align: center;
  margin-top: 40px;
}
</style>
