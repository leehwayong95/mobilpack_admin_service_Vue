<template>
  <div id="content">
    <div class="title">
      <h1>문의 상세</h1>
      <h3>HOME > 문의관리 > 문의상세</h3>
    </div>
    <div class="cont_inner">
      <table>
        <tr>
          <th>이름</th>
            <td v-if="post['user_name'] === null">삭제된 회원</td>
            <td v-else>{{post['user_name']}}</td>
          <th>연락처</th>
            <td v-if="post.phone !== null" v-text="post.phone"></td>
            <td v-else> - </td>
        </tr>
        <tr>
          <th>문의유형</th>
          <td v-if="post.category==1">이용</td>
          <td v-else-if="post.category==2">오류</td>
          <td v-else-if="post.category==3">기타</td>
          <td v-else>히히</td>
          <th>문의일시</th>
          <td v-text="post.createat"></td>
        </tr>
        <tr>
          <th>문의 제목</th>
          <td colspan="3">{{post.title}}</td>
        </tr>
      </table>
      <div class ="qna">
        <h3 v-if="post['user_name'] === null">[질의 - 삭제된 회원]</h3>
        <h3 v-else>[질의 - {{post['user_name']}}]</h3>
        <div class="Q">
          <h3 v-html="post.content"></h3>
        </div>
        <div v-if="post.replydate">
          <div v-if="!editmode">
            <div class="title">
              <h3>[답변 - {{post['admin_name']}}]</h3>
              <h3>{{post.replydate}}</h3>
            </div>
            <div class="A">
              <h3 v-html="post.reply"></h3>
              <div class="btn_wrap">
                <button @click="deleteAnswer" style="background: red;">답변 삭제</button>
                <button @click="EditMode" style="background: #6d85b1;">답변 수정</button>
              </div>
            </div>
          </div>
          <div  v-else >
            <h3>[답변 - {{admin_name}}]</h3>
            <div class="A">
              <textarea v-model="inputReply"/>
              <div class="btn_wrap">
                <button @click="setReply">저장</button>
                <button v-if="post.replydate" @click="EditMode">취소</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="input_Answer">
          <table>
            <tr>
              <th>답변상태</th>
                <td v-if="post.replydate" style="color: blue;">답변 완료</td>
                <td v-else>미처리</td>
              <th>답변자</th>
                <td v-if="post.replydate"> {{post['admin_name']}} </td>
                <td v-else-if="post.admin === null">삭제된 관리자</td>
                <td v-else>-</td>
              <th>답변일시</th>
                <td v-if="post.replydate" >{{post.replydate}}</td>
                <td v-else>-</td>
            </tr>
            <tr class = "input">
              <th>답변작성</th>
              <td colspan="5" style="padding: 10px;" class = "input">
                  <textarea v-if="post.replydate"  disabled="true" type="text" placeholder="답변이 완료되었습니다."/>
                  <textarea v-else type="text" placeholder="답변은 최대 1000자 까지 가능합니다." v-model="inputReply"/>
                  <button v-if="post.replydate == null" @click="setReply">답변 등록</button>
              </td>
            </tr>
          </table>
        </div>
    </div>
    <div class="btm_button">
        <button style="background-color: #ff4723;" @click="deleteQnaPost">문의 삭제</button>
        <button @click="backtoList">목록</button>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      index: this.$route.params.index,
      post: '',
      inputReply: '',
      editmode: false,
      admin_name: this.$cookie.get('name')
    }
  },
  created () {
    this.getQnaPost()
  },
  watch: {
    inputReply () {
      if (this.inputReply.length > 1000) {
        this.inputReply = this.inputReply.substr(0, 1000)
      }
    }
  },
  methods: {
    getQnaPost () {
      this.$axios.get('http://localhost:9000/api/su/qna/' + this.index)
        .then((res) => {
          if (res.data.status) {
            this.post = res.data.post
            this.post.phone = this.post.phone.replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/, '$1-$2-$3')
            this.post.createat = this.post.createat.split(' ')[0] + ' ' + this.post.createat.split(' ')[1].substr(0, 5)
            if (res.data.post.replydate) {
              this.editmode = false
              if (this.post['admin_name'] === null) {
                this.post['admin_name'] = '삭제된 관리자'
              }
            } else {
              this.editmode = true
            }
          } else {
            alert('이미 삭제된 게시글입니다.')
            this.$router.push('/qna')
          }
        })
    },
    backtoList () {
      this.$router.go(-1)
    },
    setReply () {
      let HTMLReply = this.convertHTML(this.inputReply)
      this.$axios.post('http://localhost:9000/api/su/qna/chat/' + this.index, {content: HTMLReply})
        .then((res) => {
          if (res.data.status) {
            this.inputReply = HTMLReply
            this.editmode = false
            this.getQnaPost()
          } else {
            alert('서버 작업중입니다. 나중에 시도해주세요.')
          }
        })
        .catch((err) => {
          if (err.response.status === 401) {
            alert('로그인이 만료되었습니다. 다시 로그인해주세요')
            this.$cookie.delete('authorization')
            this.$cookie.delete('name')
            this.$router.push('/')
          }
        })
    },
    deleteQnaPost () {
      if (confirm('삭제하시겠습니까?')) {
        this.$axios.delete('http://localhost:9000/api/su/qna/' + this.index)
          .then((res) => {
            if (res.data.status) {
              this.$router.go(-1)
            }
          })
          // .catch((err) => {
          //   console.log(err)
          //   alert('서버관리자가 열심히 일중입니다.\n잠시 후 시도해주세요')
          // })
      }
    },
    deleteAnswer () {
      if (confirm('선택한 답변을 삭제하시습니까?')) {
        this.$axios.delete('http://localhost:9000/api/su/qna/chat/' + this.index)
          .then((res) => {
            this.inputReply = ''
            this.getQnaPost()
          })
          // .catch((err) => {
          //   console.log(err)
          //   alert('서버개발자가 열심히 일중입니다.\n잠시 후 시도해주세요')
          // })
      }
    },
    EditMode () {
      this.inputReply = this.post.reply.replace(/(<br \/>)/g, '\n').replace(/(<([^>]+)>)/ig, '')
      this.editmode = !this.editmode
    },
    convertHTML (content) {
      var regURL = new RegExp(`(http|https|ftp|telnet|news|irc)://([-/.a-zA-Z0-9_~#%$?&=:200-377()]+)`, 'gi')
      var regEmail = new RegExp('([xA1-xFEa-z0-9_-]+@[xA1-xFEa-z0-9-]+.[a-z0-9-]+)', 'gi')
      return content
        .replace(regURL, `<a href='$1://$2' target='_blank'>$1://$2</a>`)
        .replace(regEmail, `<a href='mailto:$1'>$1</a>`)
        .replace(/(?:\r\n|\r|\n)/g, '<br />')
    }
  }
}
</script>

<style scoped>
table {
  margin: 20px 0;
}
#content table th {
  padding: 5px;
  width: 10%;
}
#content table tr {
  cursor: initial;
}
/* QNA관련 CSS */
div.Q {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  background-color: rgb(189, 186, 186);
}
div.A {
  width: 100%;
  margin: 5px 0;
  padding: 10px;
  border-radius: 5px;
  background-color: rgb(141, 169, 245);
  text-overflow: clip;
  overflow-wrap: anywhere;
}
div.A > input {
  border-color: rgb(105, 105, 105);
  border: 3px;
  width: 100%;
}
div.qna {
  padding-bottom: 10px;
}
div.qna h3 {
  margin: 10px 0;
}
div.qna div.title {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

div.btn_wrap {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 5px;
}
div.btn_wrap > button {
  width: 100px;
  height: 40px;
  margin-right: 5px;
}
div.btm_button {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
}

div.btm_button > button {
  width: 100px;
  height: 40px;
}
.cont_inner {
  height: auto;
}
/* 답변 부분 */
.input_Answer {
  position: relative;
  bottom: 0;
}
.input {
  position: relative;
  height: 200px;
  padding: 10px;
}
.input textarea {
  position: absolute;
  margin: 10px;
  height: calc(100% - 20px);
  width: calc(100% - 140px);
  top: 0;
  left: 0;
  border: solid 1px #ddd;
}
.input button {
  position: absolute;
  width: 100px;
  margin: 0 10px;
  right: 0;
}
#content tr:hover {
  background: initial;
  cursor:initial;
}
#content {
  overflow: auto;
}
</style>
