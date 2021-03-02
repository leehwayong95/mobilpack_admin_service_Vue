<template>
   <div id=content>
    <span class="title">
    <h1>HOME</h1>
    <h2>관리자 관리 > 관리자 상세</h2>
    </span>
    <section class="cont_inner">
      <h3 class="cont_title">계정 정보</h3>
      <table>
        <colgroup>
        <col style="width: 12%;">
        <col style="width: 38%;">
        <col style="width: 12%;">
        </colgroup>
        <tbody>
          <tr>
          <th>ID</th>
          <!-- colspan  공부 필요함 오른쪽 너비를 조절가능 -->
          <td colspan="5">{{items.admin_id}}</td>
          </tr>
          <tr>
            <th>비밀번호</th>
           <td class="center" colspan="5"><button class ="reset" id="pwReset" @click="resetclick()">비밀번호 초기화</button>{{ "&nbsp;&nbsp;&nbsp;&nbsp; ※ 비밀번호 초기화 시 “ admin1234!! “로 설정됩니다. 비밀번호 변경 후 사용 안내바랍니다."}}
            </td>
          </tr>
          <tr>
            <th>등록일시</th>
            <td>{{items.createat}}</td>
            <th>수정일시</th>
            <td colspan="3">{{items.updateat}}</td>
          </tr>
          </tbody>
        </table>
        <h3 class="cont_title"> 사용자 정보 </h3>
        <table>
          <colgroup>
          <col style="width: 12%;">
          <col style="width: 12%;">
          <col style="width: 80%;">
          </colgroup>
          <tbody>
            <tr>
            <th>이름</th>
            <td colspan="5">{{items.name}}</td>
            </tr>
            <tr>
            <th>연락처</th>
            <td colspan="5">{{items.phone}}</td>
            </tr>
            <tr>
            <th>이메일</th>
            <td colspan="5">{{items.email}}</td>
            </tr>
          </tbody>
        </table>
        <div>
          <th class="btn">
          </th>
          <button class="rightbutton" @click="back">목록</button>
          <button class="Editleftbutton" @click="edit">수정</button>
          <button class="leftbutton" @click="admindelete">삭제</button>
        </div>
    </section>
  </div>
</template>

<script>
import topbar from '../topbar.vue'
export default {
  components: { topbar },
  mounted () {
    this.$axios.post('http://localhost:9000//api/su/admin/information', {admin_id: this.$route.query.adminID})
      .then((res) => {
        this.items = res.data
        this.id = this.items.admin_id
      })
      .catch((err) => {
        console.log(err)
      })
  },
  data () {
    return {
      id: '',
      createat: '',
      updateat: '',
      name: '',
      phone: '',
      email: '',
      info: '',
      items: []
    }
  },
  methods: {
    resetclick () {
      var select = confirm('선택한 계정의 비밀번호를 초기화 하시겠습니까?')
      if (select === true) {
        this.$axios.post('http://localhost:9000//api/su/admin/pwreset', {admin_id: this.id})
          .then(res => {
            if (res.data === 'TRUE') {
              alert('수정 되었습니다. ')
            } else {
              console.log(res)
              console.log('수정 오류')
            }
          })
      } else {
      }
    },
    back () {
      this.$router.push('/details')
    },
    edit () {
      this.$router.push({
        path: '/adminedit',
        query: {items: this.items}
      })
    },
    admindelete () {
      // this.$axios.post('http://localhost:9000//api/su/admin/delete', {admin_id: this.id})
      var select = confirm('삭제하시겠습니까?')
      if (select === true) {
        this.$axios.post('http://localhost:9000//api/su/admin/delete', {admin_id: this.id})
          .then(res => {
            if (res.data === 'TRUE') {
              alert('삭제되었습니다. ')
              this.$router.push('/details')
            } else {
              console.log(res)
              console.log('삭제가 안됨')
            }
          })
      } else {
      }
    }
  }
}
</script>

<style scoped>
.btn {
  height: 50px; /* 테이블과 버튼 간격 */
}
.leftbutton {
  width: 100px;
  height: 30px;
  background: rgb(187, 54, 54);
}
.Editleftbutton {
  width: 100px;
  height: 30px;
  background: #3d4b64;
}
.rightbutton {
  float: right; /* float  이 친구를 사용해서 수정 ,삭제 버튼을 오른쪽으로 보낼수 있습니다  */
  margin-left: 30px; /* 버튼 간격 */
  width: 100px;
  height: 30px;
}
.reset {
  float: left;
  background: rgb(71, 72, 80);
  display: inline-flex;
  padding-top: 3px;
  text-align: center;
}
.center {
  line-height: 25px;
}
</style>
