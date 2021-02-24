<template>
  <div id=content>
     <span class="title">
    <h1>HOME</h1>
    <h3>관리자 관리 > 관리자 수정</h3>
    </span>
    <section class="cont_inner">
      <h3 class="cont_title">계정 정보</h3>
      <table>
        <colgroup>
        <col style="width: 12%;">
        </colgroup>
         <tbody>
          <tr>
          <th>ID</th>
          <td colspan="5">{{this.id}}</td>
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
            <td colspan="5">
            <input
            class="box"
            type="text"
            v-model="name"
            />
            </td>
            </tr>
            <tr>
            <th>연락처</th>
            <td colspan="5">
            <input
            class="box"
            type="text"
            v-model="phone"
            />
            </td>
            </tr>
            <tr>
            <th>이메일</th>
            <td colspan="5">
            <input
            class="box"
            type="text"
            v-model="email"
            />
            </td>
            </tr>
        </tbody>
      </table>
       <div class="center">
        <button class="btn" type="button" @click="cancel">취소</button>
        <button class="btn" type="button" @click="save">저장</button>
        </div>
    </section>
  </div>
</template>

<script>
export default {
  mounted () {
    this.$axios.post('http://localhost:9000//api/su/admin/information', {admin_id: this.$route.query.items.admin_id})
      .then((res) => {
        this.items = res.data
        this.id = this.items.admin_id
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  methods: {
    save () {
      var select = confirm('저장 하시겠습니까?')
      if (select === true) {
        this.$axios.post('http://localhost:9000//api/su/admin/edit', { admin_id: this.id, name: this.name, phone: this.phone, email: this.email })
          .then(res => {
            if (res.data === 'TRUE') {
              console.log(res)
              alert('저장 되었습니다. ')
              this.$router.push({
                path: '/admindetails',
                query: {adminID: this.id}
              })
            } else {
              console.log(res)
              console.log('저장 실패')
            }
          })
      } else {
      }
    },
    cancel () {
      this.$router.push({
        path: '/admindetails',
        query: {adminID: this.id}
      })
    }
  },
  data () {
    return {
      id: this.$route.query.items.admin_id,
      name: this.$route.query.items.name,
      phone: this.$route.query.items.phone,
      email: this.$route.query.items.email,
      items: []
    }
  }
}
</script>

<style scoped>
.center {
  height: 150px;
  display:flex; /* 페이징을 가운데로 정렬시켜줌 */
  justify-content:center;/*  페이징을 가운데로 정렬시켜줌 */
  align-items:center; /* 없어도 되는 놈 공부는 필요함 */
}
.box {
  width: 30%;
}
.btn {
  margin-right: 30px; /* 버튼 간격 */
  width: 100px;
  height: 30px;
}
</style>
