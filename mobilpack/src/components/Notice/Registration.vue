<template>
   <div id=content>
    <span class="title">
    <h1>HOME</h1>
    <h2>서비스 관리 > 공지사항 > 공지사항 글쓰기</h2>
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
            v-model="title"
           />
           </td>
          </tr>
          <tr>
            <th>내용</th>
             <td  style="height:500px" colspan="5">
            <textarea
            style="width:1340px; height:500px"
            class="box"
            type="text"
            v-model="content"
           />
           </td>
          </tr>
        </tbody>
        </table>
        <div class="center">
        <button class="btn" type="button" @click="join">저장</button>
        <button class="btn" type="button" @click="cancel">취소</button>
        </div>
    </section>
  </div>
</template>

<script>
export default {
  data () {
    return {
      id: 'test',
      language: 'KR',
      topsetting: '0',
      title: '',
      content: '',
      hyperlink: /(http(s)?:\/\/)([a-z0-9\w]+\.*)+[a-z0-9]{2,4}/gi, // url 정규식
      selected: '',
      result: '',
      changecontent: '',
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
      this.changecontent = this.convertHTML(this.content)
      console.log(this.changecontent)
      this.$axios.post('http://localhost:9000/api/su/notice/insert', {
        id: this.id,
        language: this.language,
        topsetting: this.topsetting,
        title: this.title,
        content: this.changecontent
      })
        .then((res) => {
          if (res.data === 'TRUE') {
            console.log(res)
            alert('등록 성공')
            this.$router.push('/notice')
          } else {
            console.log(res)
            console.log('가입 실패 다시 작성해주세요')
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
.btn {
  margin-right: 30px; /* 버튼 간격 */
  width: 100px;
  height: 30px;
}
#content > .cont_inner {
    position: relative;
    min-height: calc(100% - 164px);
    margin-top: 20px;
    padding: 20px 30px 30px;/* 위아래 여백을 만들기 위해 앞에 20px 추가함 */
    background: #fff;
    border-radius: 5px;
}
</style>
