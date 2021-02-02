<template>
  <div id="content">
    <div class="title">
      <h1>| 문의 내용</h1>
      <h3>HOME > 서비스 관리 > 고객 문의 > 문의 내용</h3>
    </div>
    <div class="cont_inner">
      <table>
        <tr>
          <th>이름</th>
            <td v-if="post['user_name'] === null">삭제된 회원</td>
            <td v-else>{{post['user_name']}}</td>
          <th>연락처</th>
            <td v-if="post.phone !== null">{{post.phone}}</td>
            <td v-else> - </td>
        </tr>
        <tr>
          <th>문의유형</th>
          <td v-if="post.category==1">이용</td>
          <td v-else-if="post.category==2">오류</td>
          <td v-else-if="post.category==3">기타</td>
          <td v-else>히히</td>
          <th>문의일시</th>
          <td>{{post.createat}}</td>
        </tr>
        <tr>
          <th>문의 제목</th>
          <td colspan="3">{{post.title}}</td>
        </tr>
      </table>
      <div class ="qna">
        <h3>[질의 - {{post['user_name']}}]</h3>
        <div class="Q">
          <h3>{{post.content}}</h3>
        </div>
        <div v-if="!editmode">
          <div class="title">
            <h3>[답변 - {{post['admin_name']}}]</h3>
            <h3>{{post.replydate}}</h3>
          </div>
          <div class="A">
            <h3>{{post.reply}}</h3>
            <div class="btn_wrap">
              <button @click="EditMode">답변 수정</button>
              <button @click="deleteAnswer">답변 삭제</button>
            </div>
          </div>
        </div>
        <div  v-else >
          <h3>[답변 - {{admin_name}}]</h3>
            <div class="A">
              <input v-model="inputReply">
              <div class="btn_wrap">
                <button @click="setReply">저장</button>
                <button @click="EditMode">취소</button>
              </div>
            </div>
          </div>
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
      admin_name: this.$cookie.get('name'),
      editmode: false
    }
  },
  mounted () {
    if (this.$axios.defaults.headers.common['authorization'] === undefined) {
      let token = this.$cookie.get('authorization')
      if (token === undefined) {
        alert('로그인 후 이용해주세요.')
      } else {
        this.$axios.defaults.headers.common['authorization'] = token
      }
    }
    this.getQnaPost()
  },
  methods: {
    getQnaPost () {
      this.$axios.get('http://localhost:9000/api/su/qna/' + this.index)
        .then((res) => {
          console.log(res)
          if (res.data.status) {
            this.post = res.data.post
            if (res.data.post.replydate) {
              this.editmode = false
              this.inputReply = res.data.post.reply
              console.log(this.post['admin_id'])
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
        .catch((err) => {
          alert('개발자가 열심히 작업중입니다.\n잠시 후 시도해주세요')
          this.$router.push('/qna')
          console.log(err)
        })
    },
    backtoList () {
      this.$router.push('/qna')
    },
    setReply () {
      this.$axios.post('http://localhost:9000/api/su/qna/chat/' + this.index, {content: this.inputReply})
        .then((res) => {
          if (res.data.status) {
            alert('등록되었습니다.')
            this.editmode = false
            this.getQnaPost()
          }
        })
        .catch((err) => {
          console.log(err)
          alert('로그인이 만료되었습니다. 다시 로그인해주세요')
          this.$router.push('/')
        })
    },
    deleteQnaPost () {
      if (confirm('문의사항 게시글을 삭제하시겠습니까?')) {
        this.$axios.delete('http://localhost:9000/api/su/qna/' + this.index)
          .then((res) => {
            if (res.data.status) {
              alert('삭제되었습니다.')
              this.$router.push('/qna')
            }
          })
          .catch((err) => {
            console.log(err)
            alert('서버관리자가 열심히 일중입니다.\n잠시 후 시도해주세요')
          })
      }
    },
    deleteAnswer () {
      if (confirm('답변을 삭제하시겠습니까?')) {
        this.$axios.delete('http://localhost:9000/api/su/qna/chat/' + this.index)
          .then((res) => {
            alert('삭제되었습니다.')
            this.getQnaPost()
          })
          .catch((err) => {
            console.log(err)
            alert('서버개발자가 열심히 일중입니다.\n잠시 후 시도해주세요')
          })
      }
    },
    EditMode () {
      this.editmode = !this.editmode
    }
  }
}
</script>

<style scoped>
table {
  margin: 20px 0;
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
  margin: 5px 0;
}

div.btm_button > button {
  width: 100px;
  height: 40px;
  margin: 0 5px;
}
.cont_inner {
  height: auto;
}

</style>
