<template>
  <div id="modal">
    <div class="title">
      <span>비밀번호 변경</span>
      <img src="..\..\assets\images\btn_modalclose.png" width="20px" alt="Close Button" @click="$emit('close')">
    </div>
    <div class="modal_message">
      <span>현재 비밀번호</span>
      <input type="password" v-model='currentpw'>
      <span>변경 비밀번호</span>
      <input type="password" v-model='editpw'>
      <span>변경 비밀번호 확인</span>
      <input type="password" v-model='confirmpw'>
      <p></p>
      <p v-if="confirmpw !== editpw" style="color: red;" id="pwalert">비밀번호가 틀립니다</p>
    </div>
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
#modal > div.modal_message {
  width: 100%;
  height: calc(100%-50px);
  display:grid;
  margin: 20px 0;
  grid-template-columns: 120px 200px;
  grid-template-rows: 30px 30px 30px;
  padding: 10px;
  gap: 10px;
  align-items: center;
}
div.modal_button_wrap {
  position: absolute;
  bottom: 10px;
}
</style>

<script>
export default {
  data () {
    return {
      currentpw: '',
      editpw: '',
      confirmpw: ''
    }
  },
  props: [
    'hot_table'
  ],
  methods: {
    editPw () {
      var reg = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/
      if (this.currentpw === '' || this.editpw === '' || this.confirmpw === '') {
        alert('비밀번호를 입력해주세요.')
      } else if (this.editpw !== this.confirmpw) {
        alert('비멀번호가 일치하지않습니다.')
        this.confirmpw = ''
        this.editpw = ''
      } else if (!reg.test(this.editpw)) {
        alert('비밀번호 양식이 맞지않습니다.\n비밀번호는 영문,숫자 포함 8자 이상이어야합니다.')
        this.editpw = ''
        this.confirmpw = ''
      } else {
        if (this.editpw === this.confirmpw) {
          this.$axios.post('http://localhost:9000/api/su/my/pwupdate', {
            currentpw: this.currentpw,
            editpw: this.editpw
          })
            .then((res) => {
              if (res.status === 202) {
                alert('현재 비밀번호와 일치하지 않습니다.')
              } else {
                alert('변경되었습니다.')
                this.$router.push('/')
                this.$emit('close')
              }
            })
        } else {
          alert('새비밀번호와 일치하지않습니다.\n다시 입력해주세요. ')
          this.editpw = ''
          this.confirmpw = ''
        }
      }
    }
  }
}
</script>
