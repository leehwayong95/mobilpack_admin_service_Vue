<template>
  <div id='content'>
    <div class="title">
      <h1>문의 관리</h1>
      <h3>HOME > 문의관리</h3>
    </div>
    <div class="search">
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
        <li class ="date">
          <span>문의 일시</span>
          <p class="date">
            <input type="date" @keydown.prevent = "handlekeyDown" v-model="tmp.min">
            <i>~</i>
            <input type="date" @keydown.prevent = "handlekeyDown" v-model="tmp.max">
          </p>
        </li>
        <li>
          <span>문의제목</span>
          <input type="text" v-model="tmp.title" maxlength="10">
        </li>
        <li>
          <span>답변유무</span>
          <select v-model="tmp.answer">
            <option value="">전체</option>
            <option value="1">답변완료</option>
            <option value="0">미처리</option>
          </select>
        </li>
      </ul>
      <button @click="getSearch">검색</button>
    </div>
    <div class="cont_inner">
      <p class="admintitle">| 문의 목록</p>
      <table class="list">
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
        <tr style="cursor: initial;">
          <th rowspan="2">No.</th>
          <th colspan="4">문의 정보</th>
          <th colspan="3">답변 정보</th>
        </tr>
        <tr style="cursor: initial;">
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
          <td>{{post.createat.split(' ')[0]}} {{post.createat.split(' ')[1].substr(0,5)}}</td>
            <td v-if="post['user_name'] == null">삭제된 회원</td>
            <td v-else>{{post['user_name']}}</td>
            <td v-if="post.replydate == null">미처리</td>
            <td v-else style="color: blue;">답변완료</td>
            <td v-if="(post['admin_name'] == null ) && (post.replydate == null)"> - </td>
            <td v-else-if="(post['admin_name'] == null) && (post.replydate != null)"> 삭제된 관리자 </td>
            <td v-else>{{post['admin_name']}}</td>
            <td v-if="post.replydate == null"> -</td>
            <td v-else>{{post.replydate.split(' ')[0]}} {{post.replydate.split(' ')[1].substr(0,5)}}</td>
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
      page: this.$route.query.page ? parseInt(this.$route.query.page) : 1,
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
  methods: {
    getSearch () {
      // 동작여부 Flag
      let doFlag = true
      // 조건 맞는지 확인
      if (this.tmp.min && this.tmp.max) { // min, max 둘다 주어졌을때만 동작
        if (this.tmp.min > this.tmp.max) {
          doFlag = false
        }
        if (doFlag) {
          // 최소기간에서 1년후 기간 객체 이용해서 생성
          let minAfterYear = this.$moment(this.tmp.min).add(12, 'months').add(1, 'd')
          minAfterYear = this.$moment(minAfterYear).format('YYYY-MM-DD')
          // 비교
          if (this.tmp.max > minAfterYear) {
            doFlag = false
          }
        }
      }
      // Flag에 따라 동작
      if (doFlag) {
        this.page = 1
        this.search = this.tmp
        this.getList()
      } else {
        alert('유효하지 않은 날짜입니다.\n날짜간격은 12개월 이내로, 시작일은 종료일보다 앞서서 설정해주세요')
        this.tmp.max = ''
      }
    },
    async getList (n) {
      await this.$axios.patch('http://localhost:9000/api/su/qna/search', {
        category: this.search.category,
        title: this.search.title,
        min: this.search.min.replace(/-/g, ''),
        max: this.search.max.replace(/-/g, ''),
        answer: this.search.answer,
        page: n === undefined ? this.page : n,
        count: 20
      })
        .then((res) => {
          this.List = res.data.list
          this.postcount = res.data.count
          this.endpage = parseInt(res.data.count / 20)
          this.endpage += (res.data.count % 20) ? 1 : 0
        })
    },
    handlekeyDown (e) {
      e.preventDefault()
    },
    view (n) {
      this.$router.push({path: this.$route.path + '/' + n})
    },
    async getPage (n) {
      if (this.page !== n) {
        await this.getList(n)
        this.page = n
        this.$router.push({query: {page: n}})
      }
    },
    getNextBeforePage (n) {
      if (n === '0' && this.page > 1) {
        this.getPage(this.page - 1)
      } else if (n === '1' && this.page < this.endpage) {
        this.getPage(this.page + 1)
      }
    }
  }
}
</script>

<style scoped>
td.long {
  overflow: hidden;
  text-align: left;
}
.here {
  background-color: #3e61dc;
  color: #fff;
}
#content table td {
  text-align: center;
}
#content table td#title {
  text-align: left;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.here {
  background-color: #3e61dc;
  color: #fff;
}
/* 달력 선택 */
input[type="date"] {/* 날짜를 고르는 버튼 구역에 따라 달력이 나오게 해줌 (이 표시가 없어지면 달력이 한쪽으로만 표출됨)*/
  position: relative;
}
input[type="date"]:after {/* 날짜선택구간 옆에 ▼표시를 생성함 ,버튼적용됨 */
  content: "\25BC";
  color: #555;
  padding: 0 5px;
}
input[type="date"]::-webkit-calendar-picker-indicator {/* 달력을 표출 */
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: auto;
  height: auto;
  color: transparent;
  background: transparent
}
</style>
