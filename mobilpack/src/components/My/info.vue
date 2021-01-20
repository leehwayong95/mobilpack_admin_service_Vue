<template>
  <div id="content">
    <div class='cont_inner'>
      <div class="acountinfo_wrap">
        <h3>계정 정보</h3>
        <table>
          <tbody>
            <tr>
              <th>ID</th>
              <td>{{id}}</td>
            </tr>
            <tr>
              <th>PW</th>
              <td><button>뭘봐</button></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="userinfo_wrap">
        <h2>사용자 정보</h2>
        <table>
          <tbody>
            <tr>
              <th>이름</th>
              <td><input type="text" v-model="name"/></td>
            </tr>
            <tr>
              <th>연락처</th>
              <td><input type="text" v-model="phone"/></td>
            </tr>
            <tr>
              <th>이메일</th>
              <td><input type="text" v-model="email"/></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="button_wrap">
        <input type="button" value="저장" style="width: 150px;" @click="editInfo">
      </div>
    </div>
  </div>
</template>

<script>
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
  methods: {
    getMyInfo () {
      this.$axios.get('http://localhost:9000/api/su/my/info')
        .then((res) => {
          this.id = res.data.admininfo['admin_id']
          this.phone = res.data.admininfo.phone
          this.email = res.data.admininfo.email
        })
        .catch((err) => {
          console.log(err)
          alert('정보 조회를 실패하였습니다.\n잠시후 다시 시도해주세요.')
          this.$router.go(-1)
        })
    },
    editInfo () {
      if (this.name === '' || this.phone === '' || this.email === '') {
        alert('정보를 확인해주세요.')
      } else {
        this.$axios.post('http://localhost:9000/api/su/my/infoupdate', {
          name: this.name,
          phone: this.phone,
          email: this.email
        })
          .then((res) => {
            alert('수정이 완료되었습니다.')
            this.$router.push('/main')
          })
          .catch((res) => {
            alert('정보 조회를 실패하였습니다.\n잠시후 다시 시도해주세요.')
          })
      }
    }
  }
}
</script>
