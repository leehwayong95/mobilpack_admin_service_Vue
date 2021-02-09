<template>
    <div class = "scroll" id='content'>
       <span class="title">
       <h1>HOME</h1>
       <h3>HOME > 공지사항 </h3>
    </span>
    <div class="search">
      <ul>
         <li>
         <span>언어</span>
         <input type="text" v-model="language" v-on:keyup.enter="search">
         </li>
        <li>
          <span>제목or내용</span>
          <input type="text" v-model="titleandcontent" v-on:keyup.enter="search">
        </li>
      </ul>
      <button v-on:click="search">검색</button>
    </div>
    <div>
      <div class="cont_inner">
        <div class="indecate">
          <p style="font-size:20px">| 공지사항 목록   </p>
          <button class="insertbutton" @click="NoticeRegister"> 글쓰기</button>
        </div>
        <table>
            <colgroup>
            <col width="10%"><!-- No 너비를 조절가능 -->
            <col width="10%"><!-- 언어 너비를 조절가능 -->
            <col width="40%"><!-- 제목 너비를 조절가능 -->
            <col width="20%"><!-- 작성일시 너비를 조절가능 -->
            <col width="15%"><!-- 작성자 너비를 조절가능 -->
            <col width="10%"><!-- 조회수 너비를 조절가능 -->
            <col width="15%"><!-- 게시상태 너비를 조절가능 -->
            </colgroup>
        <thead>
         <tr>
            <th>No</th>
            <th>언어</th>
            <th>제목</th>
            <th>작성일시</th>
            <th>작성자</th>
            <th>조회수</th>
            <th>게시상태</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(p,idx) in items" :key="idx" v-show="Currentpage" @click="rowClick(p.postindex)">
            <td>{{(20*(Currentpage-1)+(idx+1))}}</td>
            <td v-if="'KR' === p.language" >한국어</td>
            <td v-else-if="'JP' === p.language" >일본어</td>
            <td v-else-if="'CN' === p.language" >중국어</td>
            <td v-else>영어</td>
            <td class="row" v-if="'1'===p.topsetting">
              <div class="imp">
                중요
              </div>
              {{ p.title }}
            </td>
            <td v-else>{{ p.title }}</td>
            <td>{{ p.createat }}</td>
            <td colspan="1" v-if= "null === p.name">삭제된 관리자</td>
            <td colspan="1" v-else >{{p.name}}</td>
            <td>{{ p.viewcount }}</td>
            <td v-if="'1'=== p.enabled">게시중</td>
            <td v-else>게시중단</td>
          </tr>
        </tbody>
        </table>
        <div class="paging">
        <a class="pagingFirst"/>
          <ul v-for="(n,index) in paging()" :key="index" href="javascript:;" >
            <li @click="ckpage(`${n}`)">{{n}}</li>
          </ul>
        <a class="pagingLast"/>
      </div>
      </div>
    </div>
    </div>
</template>

<script>
export default {
  mounted () {
    this.$axios.get('http://localhost:9000//api/su/notice/search', {params: { Currentpage: 1, Number: this.Number, language: this.language, title: this.titleandcontent }})
      .then((res) => {
        console.log(res)
        console.log(res.data.count)
        this.items = res.data.result
        this.end_page = res.data.count / this.Number // count:list 수 를 20으로 나누어서 몇 페이지 필요한지 계산
        if (res.data.count % this.Number >= 1) {
          this.end_page = this.end_page + 1
        } else {
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },
  data () {
    return {
      items: [],
      listtotal: '',
      Currentpage: 1,
      Number: 20,
      language: '',
      titleandcontent: '',
      start_page: '',
      end_page: '',
      paging: function () {
        var pageNumber = []
        this.start_page = 1
        for (var i = this.start_page; i <= this.end_page; i++) pageNumber.push(i)
        return pageNumber
      }
    }
  },
  methods: {
    search () {
      this.$axios.get('http://localhost:9000//api/su/notice/search', {
        params: {
          Currentpage: this.Currentpage,
          Number: this.Number,
          language: this.language,
          title: this.titleandcontent
        }})
        .then((res) => {
          this.items = res.data.result
          this.listtotal = res.data.count
          this.end_page = res.data.count / this.Number
          if (res.data.count % this.Number >= 0) {
            this.end_page = this.end_page + 1
          } else {
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    rowClick (postindex) {
      this.$router.push({
        path: '/noticedetails',
        query: {index: postindex}
      })
    },
    NoticeRegister () {
      this.$router.push('/noticeregistration')
    },
    ckpage (n) {
      if (this.Currentpage !== n) {
        this.Currentpage = n
        this.search()
      }
    }
  }
}
</script>

<style scoped>
.scroll {
  overflow: scroll;
  background: lightgray;
}
.insertbutton { /* 신규등록 버튼 */
  /* float: right; 신규등록 위치 */
  font-size: 15px;
  height: 40%;
  width: 90px;
}
.cont_inner > .indecate {
    width: 100%;
    height: 50px;
}
.imp { /* 제목 앞에 붙는 중요빨간 표지 */
  width: 30px;
  height: 20px;
  background-color: red;
  color: #fff;
  float: left; /* 방향 왼쪽으로 이동 */
}
</style>
