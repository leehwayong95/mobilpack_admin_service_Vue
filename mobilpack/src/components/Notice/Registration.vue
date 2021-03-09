<template>
   <div id=content>
    <span class="title">
    <h1>공지사항 등록</h1>
    <h3>HOME > 공지사항관리 > 공지사항등록</h3>
    </span>
    <section class="cont_inner">
        <table>
        <colgroup>
        <col style="width: 12%;">
        <col style="width: 38%;">
        <col style="width: 12%;">
        <col style="width: 20%;">
        </colgroup>
        <tbody>
          <tr>
            <th>공지언어</th>
            <td colspan="5">
            <select style="width:200px" v-model="language">
            <option value="KR">한국어</option>
            <option value="US">영어</option>
            <option value="JP">일본어</option>
            <option value="CN">중국어</option>
            </select>
           </td>
          </tr>
          <tr>
            <th>공지 노출 구분</th>
             <td colspan="5">
            <select style="width:200px" v-model="topsetting">
            <option value="0">일반공지</option>
            <option value="1">중요공지</option>
            </select>
           </td>
          </tr>
          <tr>
            <th>제목</th>
             <td colspan="5">
            <input
            style="width:1000px height: 20px"
            class="box"
            type="text"
            maxlength='50'
            v-model="title"
           />
           </td>
          </tr>
          <tr class="content">
            <th>내용</th>
            <td class="content" colspan="5">
            <textarea
            class="box"
            type="text"
            maxlength='5000'
            v-model="content"
           />
           </td>
          </tr>
        </tbody>
        </table>
        <div class="center">
        <button class="canclebtn" @click="cancel">취소</button>
        <button class="savebtn" @click="join">저장</button>
        </div>
    </section>
  </div>
</template>

<script>
export default {
  data () {
    return {
      language: 'KR',
      topsetting: '0',
      title: '',
      content: '',
      hyperlink: /(http(s)?:\/\/)([a-z0-9\w]+\.*)+[a-z0-9]{2,4}/gi, // url 정규식
      selected: '',
      result: '',
      iagain: '',
      jgain: ''
    }
  },
  methods: {
    EditMode () { // 이 친구는 V-HTML있는데 왜 사용하나요 화용님
      this.inputReply = this.inputReply.replace(/(<br \/>)/g, '\n').replace(/(<([^>]+)>)/ig, '')
      this.editmode = !this.editmode
    },
    convertHTML (content) {
      var regURL = new RegExp(`(http|https|ftp|telnet|news|irc)://([-/.a-zA-Z0-9_~#%$?&=:200-377()]+)`, 'gi')
      return content
        .replace(regURL, `<a href='$1://$2' target='_blank'>$1://$2</a>`)
        .replace(/(?:\r\n|\r|\n)/g, '<br />')
    },
    join () {
      this.$axios.post('http://localhost:9000/api/su/notice/insert', {
        language: this.language,
        topsetting: this.topsetting,
        title: this.title,
        content: this.content
      })
        .then((res) => {
          if (res.data === 'FALSE') {
            console.log(res)
            console.log('가입 실패 다시 작성해주세요')
          } else if (res.data === 'JwtExpired') {
            alert('로그인이 만료되었습니다. 다시 로그인해주세요')
            this.$cookie.delete('authorization')
            this.$cookie.delete('name')
            this.$router.push('/')
          } else {
            this.$router.push({path: '/noticedetails', query: {index: res.data}})
          }
        })
    },
    cancel () {
      this.$router.push('/notice')
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
#content > .cont_inner {
    position: relative;
    min-height: calc(100% - 164px);
    margin-top: 20px;
    padding: 20px 30px 30px;/* 위아래 여백을 만들기 위해 앞에 20px 추가함 */
    background: #fff;
    border-radius: 5px;
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
#content tr.content td.content {
  padding: 5px 10px;
  height: 500px;
}
tr.content td.content textarea {
  width: 100%;
  height: 100%;
}
</style>
