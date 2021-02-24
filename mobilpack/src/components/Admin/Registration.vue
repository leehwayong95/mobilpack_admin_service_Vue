<template>
  <div id=content>
    <span class="title">
    <h1>HOME</h1>
    <h3>관리자 관리 > 관리자 신규 등록</h3>
    </span>
    <section class="cont_inner">
      <h3 class="cont_title">계정 정보</h3>
      <table>
        <colgroup>
        <col style="width: 10%;">
        <col style="width: 30%;">
        </colgroup>
        <tbody>
          <tr>
          <th>ID</th>
          <td colspan="5">
           <input
            class="box"
            type="text"
            v-model="id"
           />
          <button class ="test6" id="pwReset" @click="Idcheck(id)">중복확인</button><span class="test6">※ 영문, 숫자 사용 5자 이상 생성 가능</span>
          </td>
          </tr>
          <tr>
            <th>초기 비밀번호</th>
             <td colspan="5"> ※ 초기 비밀번호는 “ admin1234!! “로 설정됩니다 최초 로그인 시,비밀번호 변경 후 사용 안내 바랍니다.</td>
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
        <button class="btn" type="button" @click="join">등록</button>
        <button class="btn" type="button" >취소</button>
        </div>
    </section>
  </div>
</template>

<script>
export default {
  methods: {
    join () {
      this.$axios.post('http://localhost:9000//api/su/admin/join', { admin_id: this.id, name: this.name, phone: this.phone, email: this.email })
        .then((res) => {
          if (res.data === 'TRUE') {
            console.log(res)
            alert('가입 성공')
            this.$router.push('/details')
          } else {
            console.log(res)
            console.log('가입 실패 다시 작성해주세요')
          }
        })
    },
    Idcheck (id) {
      console.log(id)
      this.$axios.get('http://localhost:9000//api/su/admin/idcheck', {params: { id: id }})
        .then((res) => {
          if (res.data === 'TRUE') {
            console.log(res)
            alert('사용가능한 ID 입니다.')
          } else {
            console.log(res)
            console.log('중복된 ID 가 존재합니다')
          }
        })
    }
  },
  data () {
    return {
      id: '',
      password: '',
      name: '',
      phone: '',
      email: ''
    }
  }
}
</script>

<style scoped>
.box {
  width: 30%;
}
.center {
  height: 150px;
  display:flex; /* 페이징을 가운데로 정렬시켜줌 */
  justify-content:center;/*  페이징을 가운데로 정렬시켜줌 */
  align-items:center; /* 없어도 되는 놈 공부는 필요함(가로의 중앙을 맟춰줌!) */
}
.btn {
  margin-right: 30px; /* 버튼 간격 */
  width: 100px;
  height: 30px;
}
</style>
