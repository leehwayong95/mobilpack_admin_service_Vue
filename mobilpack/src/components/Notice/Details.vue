<template>
    <div id=content>
    <span class="title">
    <h1>공지사항 상세</h1>
    <h3>HOME > 공지사항관리 > 공지사항상세</h3>
    </span>
    <section class="cont_inner">
        <table>
        <colgroup>
        <col style="width: 100px;"><!-- 공지노출구분 너비 조절 -->
        <col style="width: 100px;"><!-- 공지노출구분 내용 조절 -->
        <col style="width: 100px;"><!-- 등록일시 제목 조절 -->
        <col style="width: 200px;"><!-- 등록일시 내용 너비 조절 -->
        <col style="width: 100px;"><!-- 수정일시 너비 조절 -->
        <col style="width: 200px;"><!-- 수정일시 너비 조절 -->
        <col style="width: 5%;"><!-- 게시상태,조회수 제목 너비 조절 -->
        <col style="width: 10%;"><!-- 조회수 내용 너비 조절 -->
        </colgroup>
         <tbody>
             <tr>
             <th>공지노출 구분</th><!-- colspan 뒤에 붙는 숫자는 테이블의 항목수입니다 -->
             <td v-if= "'1'=== items.topsetting" colspan="5">중요공지</td><!-- ex> colspan5는 5개가 (항목이)합쳐진 크기라고 보면됨  -->
             <td v-else colspan="5">일반공지</td>
             <th>게시상태</th>
             <td v-if= "'1'=== items.enabled" colspan="1">게시중</td>
             <td v-else colspan="1">게시중단</td>
             </tr>
             <tr>
             <th>제목</th>
             <td colspan="7">{{items.title}}</td>
             </tr>
             <tr>
             <th>작성자</th>
             <td colspan="1" v-if= "null === items.name">삭제된 관리자</td>
             <td colspan="1" v-else >{{items.name}}</td>
             <th>등록일시</th>
             <td colspan="1" v-text="items.createat"></td>
             <th>수정일시</th>
             <td v-if="items.updateat === null" colspan="1"></td>
             <td v-else colspan="1" v-text="items.updateat"></td>
             <th>조회수</th>
             <td colspan="1">{{items.viewcount}}</td>
             </tr>
             <tr>
             <th>내용</th>
             <!-- <여기가 내용중에서 자동으로 링크를 만들어주는 구문입니다.> </td> -->
             <div
             v-html="hypercontent"
             class="contentscroll"
             style="height:500px; width:1400px;  vertical-align: top;"
             colspan="7"
             >
             </div>
             </tr>
         </tbody>
        </table>
        <div>
          <th class="btn">
          </th>
          <button class="rightbutton" @click="back">목록</button>
          <button class="leftbutton" @click="Noticedelete">삭제</button>
          <button v-if= "'1'=== items.enabled" class="leftstopbutton" @click="viewstop">게시중단</button>
          <button v-else class="leftstopbutton" @click="viewstop">게시재개</button>
          <button class="Editleftbutton" @click="edit">수정</button>
        </div>
    </section>
    </div>
</template>

<script>
export default
{
  mounted () {
    this.getNotice()
  },
  data () {
    return {
      items: [],
      postindex: '',
      hypercontent: '', // 본문 복사
      splittext: '',
      result: [], // 링크를 담은 배열
      maintext: [] // 본문을 담은 배열
    }
  },
  methods: {
    convertHTML (content) {
      var regURL = new RegExp(`(http|https|ftp|telnet|news|irc)://([-/.a-zA-Z0-9_~#%$?&=:200-377()]+)`, 'gi')
      return content
        .replace(regURL, `<a href='$1://$2' target='_blank'>$1://$2</a>`)
        .replace(/(?:\r\n|\r|\n)/g, '<br />')
    },
    getNotice () {
      this.$axios.get('http://localhost:9000/api/su/notice/detail', {params: {postindex: this.$route.query.index}})
        .then((res) => {
          this.items = res.data
          this.items.createat = this.items.createat.substring(0, 16)
          if (this.items.updateat) {
            this.items.updateat = this.items.updateat.substring(0, 16)
          }
          this.postindex = this.$route.query.index
          this.hypercontent = this.convertHTML(res.data.content)
          this.hypercontent = this.test(this.hypercontent)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    test (str) {
      return str.replaceAll('\n', '<br/>')
    },
    back () {
      // this.$router.go(-1) // 바로 전 페이지로 이동 router 공부 필요
      this.$router.push({
        name: 'Notice',
        query: {
          page: this.$route.query.page,
          language: this.$route.query.language,
          content: this.$route.query.content
        }
      })
    },
    viewstop () {
      this.$axios.post('http://localhost:9000/api/su/notice/stopposting', {postindex: this.postindex})
        .then(res => {
          if (res.data === 'ok') {
            this.getNotice()
          } else {
            console.log(res)
            console.log('오류 다시 설정 해주세요')
          }
        })
    },
    edit () {
      this.$router.push({
        path: '/noticedit',
        query: {items: this.items}
      })
    },
    Noticedelete () {
      var select = confirm('해당 공지사항을 삭제하시겠습니까?')
      if (select === true) {
        this.$axios.post('http://localhost:9000//api/su/notice/delete', {postindex: this.postindex})
          .then(res => {
            if (res.data === 'TRUE') {
              this.$router.push('/notice')
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
#content table tr { /* pointer라고 손가락 모양 나옴 default라고 해서 변화없는 모양 나옴*/
 cursor:default;
}
.btn {
  height: 50px; /* 테이블과 버튼 간격 */
}
.Editleftbutton {
  width: 100px;
  height: 30px;
  background: #3d4b64;
}
.leftbutton {
  width: 100px;
  height: 30px;
  background: #db1e1e;
}
.leftstopbutton {
  width: 100px;
  height: 30px;
  background: #e95b09;
}
.rightbutton {
  float: right; /* float  이 친구를 사용해서 수정 ,삭제 버튼을 오른쪽으로 보낼수 있습니다  */
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
.scroll {
  overflow: scroll;
  background: #fff;
}
.contentscroll {
  overflow-y: scroll;
  background: #fff;
  height: 500px;/* 안먹어요 */
}
</style>
