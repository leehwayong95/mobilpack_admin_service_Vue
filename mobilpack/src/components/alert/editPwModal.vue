<template>
  <div id="modal">
    <div class="title">
      <span>비밀번호 변경</span>
      <img src="@/assets/images/btn_modalclose.png" width="20px" alt="Close Button" @click="$emit('close')">
    </div>
    <div class="modal_message">
      <span>현재 비밀번호</span>
      <input type="password" v-model='currentpw'>
      <span>새 비밀번호</span>
      <input type="password" v-model='editpw'>
      <span>새 비밀번호 확인</span>
      <input type="password" v-model='confirmpw'>
    </div>
    <p v-if="resCurrentPw" class="CurrentPwAlert">현재 비밀번호와 일치하지 않습니다.</p>
    <p v-if="regEditPw" class="regEditPwAlert">영문, 숫자를 포함 8자 이상으로 입력해주세요.</p>
    <p v-if="checkconfirmpw" class="ConfirmPwAlert">새 비밀번호와 일치하지 않습니다.</p>
    <div class="modal_button_wrap">
      <input class="btn btn-default col-md-3" @click="editPw" type="button" value="변경하기">
    </div>
  </div>
</template>

<style scoped>
#modal {
  position:relative;
  width: 100%;
  height: 100%;
}
#modal > div.title {
  width: 100%;
  height: 50px;
  padding: 10px;
  border-bottom: solid 1px #000;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: 0;
}
div.title img {
  cursor: pointer;
}
#modal > div.modal_message {
  width: 100%;
  height: calc(100%-50px);
  display:grid;
  margin: 20px 0;
  grid-template-columns: 120px 200px;
  grid-template-rows: 30px 30px 30px;
  padding: 10px;
  gap: 20px;
  align-items: center;
  text-align: right;
}
div.modal_button_wrap {
  position: absolute;
  bottom: 10px;
}
div.modal_button_wrap input{
  width: 100px;
  height: 30px;
  border-radius: 3px;
  font-size: 14px;
  color: #fff;
  background: #3d4b64;
  border: solid 1px #ddd;
  border-radius: 5px;
}
p.ConfirmPwAlert {
  position: absolute;
  bottom: 24%;
  right: 8%;
  color: red;
}
p.regEditPwAlert {
  position: absolute;
  bottom: 40%;
  right: 8%;
  color: red;
}
p.CurrentPwAlert {
  position: absolute;
  top: 39%;
  right: 8%;
  color: red;
}
</style>

<script>
export default {
  data () {
    return {
      currentpw: '',
      editpw: '',
      confirmpw: '',
      resCurrentPw: false,
      regEditPw: false,
      checkconfirmpw: false
    }
  },
  props: [
    'hot_table'
  ],
  watch: {
    editpw () {
      if (this.regEditPw) {
        this.regEditPw = false
      }
    },
    currentpw () {
      if (this.resCurrentPw) {
        this.resCurrentPw = false
      }
    },
    confirmpw () {
      if (this.checkconfirmpw) {
        this.checkconfirmpw = false
      }
    }
  },
  methods: {
    editPw () {
      let flag = true
      var reg = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/
      if (this.currentpw === '' || this.editpw === '' || this.confirmpw === '') {
        alert('비밀번호를 입력해주세요.')
        flag = false
      }
      if (this.editpw !== this.confirmpw) {
        console.log(this.checkconfirmpw)
        this.checkconfirmpw = true
        console.log(this.checkconfirmpw)
        flag = false
      }
      if (!reg.test(this.editpw)) {
        this.regEditPw = true
        flag = false
      }
      this.$axios.post('http://localhost:9000/api/su/my/pwupdate', {
        currentpw: this.currentpw,
        editpw: this.currentpw
      })
        .then((res) => {
          if (res.status === 202) {
            this.resCurrentPw = true
            flag = false
          }
        })
      if (flag) {
        this.$axios.post('http://localhost:9000/api/su/my/pwupdate', {
          currentpw: this.currentpw,
          editpw: this.editpw
        })
          .then((res) => {
            if (res.status === 202) {
              this.resCurrentPw = true
            } else {
              this.resCurrentPw = false
              alert('변경되었습니다.')
              this.$router.push('/')
              this.$emit('close')
            }
          })
          .catch((err) => {
            if (err.response.status === 401) {
              alert('로그인이 만료되었습니다. 다시 로그인해주세요')
              this.$cookie.delete('authorization')
              this.$cookie.delete('name')
              this.$router.push('/')
            }
          })
      }
    }
  }
}
</script>
