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
            style="width:1325px; height:500px; margin-top: 10px; margin-bottom: 10px;"
            class="box"
            type="text"
            v-model="content"
           />
           </td>
          </tr>
        </tbody>
        </table>
        <div class="center">
        <button class="canclebtn" type="button" @click="cancel">취소</button>
        <button class="savebtn" type="button" @click="change">저장</button>
        </div>
    </section>
  </div>
</template>

<script>
export default {
  data () {
    return {
      id: this.$route.query.items.id,
      language: this.$route.query.items.language,
      topsetting: this.$route.query.items.topsetting,
      title: this.$route.query.items.title,
      content: this.$route.query.items.content,
      changecontent: '',
      result: ''
    }
  },
  mounted () {
    this.$axios.get('http://localhost:9000/api/su/notice/detail', {params: {postindex: this.$route.query.items.postindex}})
      .then((res) => {
        this.items = res.data
      })
      .catch((err) => {
        console.log(err)
      })
  },
  methods: {
    change () {
      if (this.content.match(this.hyperlink)) {
        this.changecontent = this.content
        this.result = this.content.match(this.hyperlink)
        for (var i = 0; i <= this.result.length; i++) {
          this.changecontent = this.changecontent.replace(this.result[i], '<a href=' + this.result[i] + ' target="_blank"' + '>' + this.result[i] + '</a>')
          console.log('여기가 for문 결과입니다' + this.changecontent)
        }
        this.join()
      } else {
        this.changecontent = this.content
        this.join()
      }
    },
    join () {
      this.$axios.post('http://localhost:9000//api/su/notice/edit', {
        postindex: this.$route.query.items.postindex,
        id: this.id,
        language: this.language,
        title: this.title,
        content: this.content,
        topsetting: this.topsetting
      })
        .then((res) => {
          if (res.data === 'TRUE') {
            alert('등록 성공')
            this.$router.push('/notice')
          } else {
            console.log(res)
            console.log('등록 실패 다시 작성해주세요')
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
#content > .cont_inner {
    position: relative;
    min-height: calc(100% - 164px);
    margin-top: 20px;
    padding: 20px 30px 30px;/* 위아래 여백을 만들기 위해 앞에 20px 추가함 */
    background: #fff;
    border-radius: 5px;
}
</style>
