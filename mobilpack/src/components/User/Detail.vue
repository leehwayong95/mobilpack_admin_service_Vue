<template>
  <div id="content">
    <span class="title">
      <h1>회원 상세</h1>
      <h3>home > 회원관리 > 회원상세</h3>
    </span>
    <div class="cont_inner">
      <p>| 계정 정보</p>
      <table>
        <tr>
          <th>ID</th>
          <td>{{userdata['user_id']}}</td>
        </tr>
        <tr>
          <th>비밀번호</th>
          <td><button @click="setPwReset">비밀번호 초기화</button> <h3>*비밀번호 초기화 선택시, "password123"으로 초기화됩니다.</h3></td>
        </tr>
        <tr>
          <th>이름</th>
          <td>{{userdata.name}}</td>
        </tr>
        <tr>
          <th>국가</th>
          <td>{{userdata.country}}</td>
        </tr>
        <tr>
          <th>연락처</th>
          <td>{{userdata.phone}}</td>
        </tr>
        <tr>
          <th>가입일시</th>
          <td>{{userdata.createat}}</td>
        </tr>
      </table>
      <div class="btn_wrap">
        <button @click="deleteUser">회원 탈퇴 처리</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userdata: {
      }
    }
  },
  mounted () {
    this.getUserInfo()
  },
  methods: {
    getUserInfo () {
      this.$axios.get('http://localhost:9000/api/su/user/' + this.$route.params.id)
        .then((res) => {
          if (res.data.result) {
            this.userdata = res.data.info
          } else {
            alert('사용자를 조회할 수 없습니다.')
            this.$router.push('/user')
          }
        })
        .catch((err) => {
          console.log(err)
          alert('서버개발자가 열심히 일하고 있습니다.\n잠시 후 시도해주세요.')
        })
    },
    setPwReset () {
      if (confirm('선택한 계정의 비밀번호를\n초기화 하시겠습니까?')) {
        this.$axios.get('http://localhost:9000/api/su/user/pwreset?userid=' + this.$route.params.id)
          .then((res) => {
            if (res.data.result) {
              alert('초기화 하였습니다.')
            } else {
              alert('정보를 찾을 수 없습니다.')
              this.$router.push('/user')
            }
          })
          .catch((err) => {
            console.log(err)
            alert('서버개발자가 열심히 일하고 있습니다.\n잠시 후 시도해주세요.')
          })
      }
    },
    deleteUser () {
      if (confirm('선택한 회원을 탈퇴 처리하시겠습니까?\n회원 탈퇴 후 회원 정보가 삭제됩니다.')) {
        this.$axios.delete('http://localhost:9000/api/su/user/' + this.$route.params.id)
          .then((res) => {
            if (res.data.result) {
              alert('회원을 삭제하였습니다.')
              this.$router.push('/user')
            } else {
              alert('회원을 찾을 수 없습니다.')
              this.$router.push('/user')
            }
          })
          .catch((err) => {
            console.log(err)
            alert('서버개발자가 열심히 일을 하고 있습니다.\n잠시 후 시도해주세요.')
          })
      }
    }
  }
}
</script>

<style scoped>
#content {
  overflow: scroll;
}
.cont_inner > table > tr >th {
  width: 25%;
}
.cont_inner > table > tr > td {
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>
