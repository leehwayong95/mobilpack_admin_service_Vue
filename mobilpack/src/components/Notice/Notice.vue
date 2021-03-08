<template>
    <div class = "scroll" id='content'>
       <span class="title">
       <h1>공지사항 관리</h1>
       <h3>HOME > 공지사항관리</h3>
    </span>
    <div class="search">
      <ul>
         <li>
         <span>언어</span>
          <select style="width:200px" v-model="language" v-on:keyup.enter="search">
            <option value="">전체</option>
            <option value="KR">한국어</option>
            <option value="EN">영어</option>
            <option value="JP">일본어</option>
            <option value="CN">중국어</option>
          </select>
         </li>
        <li>
          <span>제목or내용</span>
          <input type="text" v-model="titleandcontent" v-on:keyup.enter="search">
        </li>
      </ul>
      <button class="searchbutton"  @click="search">검색</button>
    </div>
      <div class="cont_inner">
          <p class="admintitle">| 공지사항 목록</p>
          <button class="insertbutton" @click="NoticeRegister"> 글쓰기</button>
        <table class="list">
            <colgroup>
            <col width="2%"><!-- No 너비를 조절가능 -->
            <col width="3%"><!-- 언어 너비를 조절가능 -->
            <col width="20%"><!-- 제목 너비를 조절가능 -->
            <col width="6%"><!-- 작성일시 너비를 조절가능 -->
            <col width="4%"><!-- 작성자 너비를 조절가능 -->
            <col width="3%"><!-- 조회수 너비를 조절가능 -->
            <col width="4%"><!-- 게시상태 너비를 조절가능 -->
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
            <td>{{ (listtotal)-(20*(page-1)+(idx))}}</td>
            <td v-if="'KR' === p.language" >한국어</td>
            <td v-else-if="'JP' === p.language" >일본어</td>
            <td v-else-if="'CN' === p.language" >중국어</td>
            <td v-else>영어</td>
            <td id="title" v-if="'1'===p.topsetting">
              <span class="point">
                중요
              </span>
              {{ p.title }}
            </td>
            <td v-else id="title">{{ p.title }}</td>
            <td>{{ p.createat.substring(0,16) }}</td>
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
            <li v-if="page !== n" @click="ckpage(n)">{{n}}</li>
            <li v-else class="Currentpage" >{{n}}</li>
          </ul>
        <a class="pagingLast"/>
      </div>
      </div>
    </div>
</template>

<script>
export default {
  mounted () {
    this.pagingmove()
  },
  data () {
    return {
      page: this.$route.query.page ? parseInt(this.$route.query.page) : 1,
      items: [],
      listtotal: '',
      Currentpage: 1,
      Number: 20,
      language: this.$route.query.language ? this.$route.query.language : '',
      titleandcontent: this.$route.query.content ? this.$route.query.content : '',
      fixlanguage: this.$route.query.language ? this.$route.query.language : '',
      fixtitleandcontent: this.$route.query.content ? this.$route.query.content : '',
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
      this.page = 1
      this.$router.push({query: {page: this.page, language: this.language, content: this.titleandcontent}})
      this.fixlanguage = this.language
      this.fixtitleandcontentc = this.titleandcontent
      this.$axios.get('http://localhost:9000//api/su/notice/search', {
        params: {
          Currentpage: this.page,
          Number: this.Number,
          language: this.language,
          titlename: this.titleandcontent
        }})
        .then((res) => {
          this.items = res.data.result
          this.listtotal = res.data.count
          this.end_page = res.data.count / this.Number
          if (res.data.count % this.Number > 0) {
            this.end_page = this.end_page + 1
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    pagingmove () {
      this.$axios.get('http://localhost:9000//api/su/notice/search', {
        params: {
          Currentpage: this.page,
          Number: this.Number,
          language: this.fixlanguage,
          title: this.fixtitleandcontent
        }})
        .then((res) => {
          this.items = res.data.result
          this.listtotal = res.data.count
          this.end_page = res.data.count / this.Number
          if (res.data.count % this.Number >= 0) {
            this.end_page = this.end_page + 1
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
      if (this.page !== n) {
        this.page = n
        this.pagingmove()
        this.$router.push({name: this.$route.name, query: {page: n, language: this.fixlanguage, content: this.fixtitleandcontent}})
      }
    }
  }
}
</script>

<style scoped>

button.insertbutton{
    position: absolute;
    right: 30px;
    top: 20px;
    width: 90px;
    height: 30px;
    padding: 0 15px;
}
.point {
    background: rgb(245 44 44);
    font-size: 15px;
    height: 25px;
    width: 40px;
    padding: 2px;
    text-align: center;
    justify-content: center; /* dispaly로flex 를 지정하였고 이친구는 flex 내용물 들을 조정하는 문구입니다 */
    display: inline-flex;  /* inline 은 세로로 공간파일이 생긴다고 생각하면 됨 */
    border-radius: 5px;
    margin-right: 10px;
    color:aliceblue;
}
.click {
  background: rgb(6, 59, 119);
}
#content table td {
  text-align: center;
}
#content table td#title {
  text-align: left;
}
#content > .search > button {
  width: 90px;
  right: 32px;
}
.Currentpage {
  background-color: #3e61dc;
  color: #fff;
}
</style>
