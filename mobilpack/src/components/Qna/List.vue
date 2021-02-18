<template>
  <div id='content'>
    <div class="title">
      <h1>| 문의 관리</h1>
      <h3>HOME > 서비스관리 > 고객문의</h3>
    </div>
    <div class="search" style="margin: 10px 0;">
      <ul>
        <li>
          <span>문의 유형</span>
          <select v-model="tmp.category">
            <option value="">전체</option>
            <option value="1">이용</option>
            <option value="2">오류</option>
            <option value="3">기타</option>
          </select>
        </li>
        <li>
          <span>제목</span>
          <input type="text" v-model="tmp.title">
        </li>
        <li class ="date" style="width: 370px">
          <span>문의 일시</span>
          <p class="date">
            <input type="date" v-model="tmp.min">
            <i>~</i>
            <input type="date" v-model="tmp.max">
          </p>
        </li>
        <li>
          <span>답변유무</span>
          <select v-model="tmp.answer">
            <option value="">전체</option>
            <option value="0">답변대기</option>
            <option value="1">답변완료</option>
          </select>
        </li>
      </ul>
      <button @click="getSearch">검색</button>
    </div>
    <div class="cont_inner">
      <table style="margin: 20px 0;">
        <colgroup>
          <col width="5%">
          <col width="10%">
          <col width="18%">
          <col width="17%">
          <col width="8%">
          <col width="15%">
          <col width="10%">
          <col width="20%">
        </colgroup>
        <tr>
          <th rowspan="2">No.</th>
          <th colspan="4">문의 정보</th>
          <th colspan="3">답변 정보</th>
        </tr>
        <tr>
          <th scope="col">문의 유형</th>
          <th scope="col">문의 제목</th>
          <th scope="col">문의 일시</th>
          <th scope="col">고객명</th>
          <th scope="col">답변 유무</th>
          <th scope="col">답변자</th>
          <th scope="col">답변 일시</th>
        </tr>
        <tr v-for="(post,index) in List" v-bind:key="index" @click="view(post.qnaindex)">
          <td>{{postcount - ((page-1) * 20 + (index))}}</td>
            <td v-if="post.category == 1">이용</td>
            <td v-else-if="post.category == 2">오류</td>
            <td v-else-if="post.category == 3">기타</td>
          <td id="title">{{post.title}}</td>
          <td>{{post.createat}}</td>
            <td v-if="post['user_name'] == null">삭제된 회원</td>
            <td v-else>{{post['user_name']}}</td>
            <td v-if="post.replydate == null">답변대기</td>
            <td v-else>답변완료</td>
            <td v-if="(post['admin_name'] == null ) && (post.replydate == null)"> - </td>
            <td v-else-if="(post['admin_name'] == null) && (post.replydate != null)"> 삭제된 관리자 </td>
            <td v-else>{{post['admin_name']}}</td>
            <td v-if="post.replydate == null"> -</td>
            <td v-else>{{post.replydate}}</td>
        </tr>
      </table>
      <div class="paging">
        <a class ="pagingFirst"  @click="getNextBeforePage('0')"/>
          <ul v-for="(n,index) in paging()" v-bind:key="index">
            <li  v-if="page !== n" class = "Nothere" @click="getPage(n)">{{n}}</li>
            <li v-else class="here">{{n}}</li>
          </ul>
        <a class="pagingLast" @click="getNextBeforePage('1')"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      List: null,
      search: {
        category: '',
        title: '',
        min: '',
        max: '',
        answer: ''
      },
      tmp: {
        category: '',
        title: '',
        min: '',
        max: '',
        answer: ''
      },
      page: 1,
      endpage: null,
      postcount: '',
      paging: function () {
        var pagenumber = []
        for (var i = 1; i <= this.endpage; i++) {
          pagenumber.push(i)
        }
        return pagenumber
      }
    }
  },
  mounted () {
    this.getList()
  },
  watch: {
    max () {
      if (this.min > this.max) {
        alert('최소일 보다 커야합니다.')
        this.max = this.min + 1
      }
    }
  },
  methods: {
    getSearch () {
      this.search = this.tmp
      this.getList()
    },
    getList () {
      this.$axios.patch('http://localhost:9000/api/su/qna/search', {
        category: this.search.category,
        title: this.search.title,
        min: this.search.min.replace(/-/g, ''),
        max: this.search.max.replace(/-/g, ''),
        answer: this.search.answer,
        page: this.page,
        count: 20
      })
        .then((res) => {
          this.List = res.data.list
          this.postcount = res.data.count
          this.endpage = res.data.count / 20
          this.endpage += (res.data.count % 20) ? 1 : 0
        })
        .catch((err) => {
          console.log(err)
          alert('개발자가 열심히 일중입니다\n잠시 후 이용해주세요')
        })
    },
    view (n) {
      this.$router.push('/qna/' + n)
    },
    getPage (n) {
      if (this.page !== n) {
        this.page = n
        this.getList()
      }
    }
  }
}
</script>

<style scoped>
#content {
  overflow: scroll;
}
td.title {
  overflow: hidden;
  text-align: left;
}
.here {
  background-color: #3e61dc;
  color: #fff;
}
</style>
