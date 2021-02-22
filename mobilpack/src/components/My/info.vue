<template>
  <div id="content">
    <div class="cont_header">
      <h2 class="page_title">설정</h2>
      <span class="page_path">HOME > 설정</span>
    </div>
    <div class='cont_inner'>
      <div class="acountinfo_wrap">
        <h3>| 계정 정보</h3>
        <table>
          <tbody>
            <tr>
              <th>ID</th>
              <td>{{id}}</td>
            </tr>
            <tr>
              <th>PW</th>
              <td><button @click="editPwModal">비밀번호 변경</button></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="userinfo_wrap">
        <h3>|사용자 정보</h3>
        <table>
          <tbody>
            <tr>
              <th>이름</th>
              <td><input type="text" v-model="name" id="input_name"/></td>
            </tr>
            <tr>
              <th>연락처</th>
              <td><input type="text" v-model="phone" id="input_phone"/></td>
            </tr>
            <tr>
              <th>이메일</th>
              <td><input type="text" v-model="email" id="input_email"/></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="button_wrap">
        <button @click="editInfo">저장</button>
      </div>
    </div>
  </div>
</template>

<script>
import editPwModal from '../alert/editPwModal'
export default {
  data () {
    return {
      id: '',
      name: this.$cookie.get('name'),
      phone: '',
      email: ''
    }
  },
  mounted () {
    this.getMyInfo()
  },
  watch: {
    // 입력방지
    // id : 영문, 골뱅이, '.'문자만 허용
    // pw : 영문, 숫자
    // phone : 12글자, 숫자
    email () {
      if (!this.checkEmail) {
        this.email = this.email.replace(/[^A-Za-z0-9@._+]/g, '')
      }
    },
    name () {
      this.name = this.name.replace(/[^ㄱ-ㅎ가-힣+]/g, '')
    },
    phone () {
      this.phone = this.phone.replace(/[^0-9+]/g, '')
    }
  },
  methods: {
    getMyInfo () {
      // if (this.$axios.defaults.headers.common['authorization'] === undefined) {
      //   let token = this.$cookie.get('authorization')
      //   if (token === undefined) {
      //     alert('로그인 후 이용해주세요.')
      //   } else {
      //     this.$axios.defaults.headers.common['authorization'] = token
      //   }
      // } 라우터 가드 처리로 header 처리 전역화
      this.$axios.get('http://localhost:9000/api/su/my/info')
        .then((res) => {
          this.id = res.data.admininfo['admin_id']
          this.phone = res.data.admininfo.phone
          this.email = res.data.admininfo.email
        })
        .catch((err) => {
          console.log(err)
          alert('로그인이 만료되었습니다. 다시 로그인해주세요')
          this.$router.push('/')
        })
    },
    editInfo () {
      let confirminfo = {
        input_name: this.name,
        input_phone: this.phone,
        input_email: this.email
      }

      let message = {
        input_name: '이름을 입력해주세요',
        input_phone: '전화번호를 입력해주세요',
        input_email: '이메일을 입력해주세요'
      }
      let confirmflag = true
      // 정보 빈칸 검사
      for (let i in confirminfo) {
        if (confirminfo[i] === '') {
          alert(message[i])
          confirmflag = false
          document.getElementById(i).focus()
          break
        }
      }
      // 이메일 형식검사
      if (confirmflag && !this.emailCheck(this.email)) {
        alert('이메일 형식이 아닙니다.\n다시 입력해주세요.')
        document.getElementById('input_email').focus()
        confirmflag = false
      }
      // 휴대폰 형식검사
      if (confirmflag && !this.phoneCheck(this.phone)) {
        alert('휴대폰 형식이 아닙니다.\n다시 입력해주세요.')
        document.getElementById('input_phone').focus()
        confirmflag = false
      }
      // 정보 모두 확인시 변경 시도
      if (confirmflag) {
        this.$axios.post('http://localhost:9000/api/su/my/infoupdate', {
          name: this.name,
          phone: this.phone,
          email: this.email
        })
          .then((res) => {
            alert('수정이 완료되었습니다.')
            this.$router.push('/main')
          })
          .catch((err) => {
            console.log(err)
            alert('로그인이 만료되었습니다. 다시 로그인해주세요')
            this.$router.push('/')
          })
      }
    },
    // 이메일 검사 메서드
    emailCheck (asEmail) {
      var regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
      return regExp.test(asEmail)
    },
    // 휴대폰 번호 검사 메서드
    phoneCheck (asPhone) {
      var regExp = /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/
      return regExp.test(asPhone)
    },
    editPwModal () {
      this.$modal.show(editPwModal, {
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

<style scoped>
#content > .cont_inner{
  margin: 0;
}
#content h3{
    height: 60px;
    padding-top: 20px;
    font-weight: 500;
    font-size: 1.25em;
    line-height: 2em;
}
#content table tr{
  cursor: default;
}
#content table tr:hover{
  background: none;
}
.acountinfo_wrap, .userinfo_wrap{
  padding: 0;
}
#content table th{
  width: 160px;
}
#content input[type="text"]{

    width: 540px;
    border: 1px solid #ddd;
}
#content input[type="button"]{
    border: 0;
    background: #3d4b64;
    cursor: pointer;
    border-radius: 5px;
    color: #fff;
    margin-top: 20px;
}
</style>
