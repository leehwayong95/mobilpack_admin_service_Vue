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
        <col style="width: 11%;">
        </colgroup>
        <tbody>
          <tr>
          <th>ID</th><!-- /:이친구는 뭘까요? [^]:대괄호 안에 문자를 제외한 모든문자  g:전역검사 $:입력값끝 +:앞의 표현식 반복?? -->
          <td colspan="5">
           <input
            class="box"
            type="text"
            v-model="id"
            oninput="javascript: this.value = this.value.replace(/[^A-Za-z0-9+]/g, '');"
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
          <col style="width: 18%;">
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
            maxlength="50"
            />
            </td>
            </tr>
            <tr><!-- oninput 이부분은 가능하면 아래에 따로 빼서 함수로 처리해보는것도 공부로 필요함  -->
            <th>연락처</th><!-- oninput ==>숫자만 입력가능한 명령문 이해가 필요함  -->
            <td colspan="5">
            <input
            class="box"
            type="text"
            v-model="phone"
            maxlength="15"
            oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
            />{{" ※  ‘-’ 없이 입력해 주세요."}}
            </td>
            </tr>
            <tr>
            <th>이메일</th>
            <td colspan="5">
            <input
            class="box"
            type="text"
            v-model="email"
            maxlength="50"
            />
            </td>
            </tr>
          </tbody>
        </table>
        <div class="center">
        <button class="canclebtn"  @click="cancel">취소</button>
        <button class="savebtn"  @click="join">등록</button>
        </div>
    </section>
  </div>
</template>

<script>
export default {
  methods: {
    join () {
      this.Han = this.id.replace(/[^A-Za-z+]/g, '')
      this.Num = this.id.replace(/[^0-9+]/g, '')
      console.log(this.Han)
      console.log(this.Num)
      console.log(this.id.length)
      if (this.id === '') {
        alert('아이디를 입력해주세요')
      } else if (this.id.length < 6 || (this.Han.length === 0 || this.Num.length === 0)) {
        alert('영문,숫자포함 5자이상이여야 합니다')
        this.id = null
      } else if (this.IDAgaincheck !== true) {
        alert('ID 중복체크를 해주세요 ')
      } else if (this.name === '') {
        alert('이름을 입력해주세요 ')
      } else if (this.phone === '') {
        alert('전화번호를 입력해주세요 ')
      } else if (this.email === '') {
        alert('이메일을 입력해주세요 ')
      } else if (!this.email.match(/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i)) {
        alert('이메일 형식이 아닙니다 ')
      } else {
        this.$axios.post('http://localhost:9000//api/su/admin/join', { admin_id: this.id, name: this.name, phone: this.phone, email: this.email })
          .then((res) => {
            if (res.data === 'TRUE') {
              alert('가입 성공')
              this.$router.push('/details')
            } else {
              console.log('가입 실패 다시 작성해주세요')
            }
          })
      }
    },
    cancel () {
      this.$router.push('/details')
    },
    Idcheck (id) {
      this.Han = this.id.replace(/[^A-Za-z+]/g, '')
      this.Num = this.id.replace(/[^0-9+]/g, '')
      if (this.id.length < 6 || (this.Han.length === 0 || this.Num.length === 0)) {
        alert('영문,숫자포함 5자이상이여야 합니다')
        this.id = null
      } else {
        this.$axios.get('http://localhost:9000//api/su/admin/idcheck', {params: { id: id }})
          .then((res) => {
            if (res.data === 'TRUE') {
              this.IDAgaincheck = true
              alert('사용가능한 ID 입니다.')
            } else {
              console.log(res)
              alert('중복된 ID 가 존재합니다')
            }
          })
      }
    }
  },
  data () {
    return {
      Han: '',
      Num: '',
      id: '',
      password: '',
      name: '',
      phone: '',
      email: '',
      IDAgaincheck: false
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
.savebtn {
  margin-right: 30px; /* 버튼 간격 */
  width: 100px;
  height: 30px;
}
.canclebtn {
  margin-right: 30px; /* 버튼 간격 */
  width: 100px;
  height: 30px;
  background: rgb(240, 11, 11);
}
</style>
