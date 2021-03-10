<template>
  <div id="content">
    <span class="title">
      <h1>회원 관리</h1>
      <h3>home > 회원관리</h3>
    </span>
    <div class = "search">
      <ul>
        <li>
          <span>국가</span>
          <select name="region" v-model="tmp.region">
            <option value="">전체</option>
            <option value="KR">대한민국</option>
            <option value="US">미국</option>
            <option value="JP">일본</option>
            <option value="CN">중국</option>
          </select>
        </li>
      <li style="width: fit-content;">
          <span>가입 기간</span>
          <p class="date">
            <input type="date" v-model="tmp.min" max="9999-12-31">
            <i>~</i>
            <input type="date" v-model="tmp.max" max="9999-12-31">
          </p>
      </li>
      <li>
        <span>ID</span>
        <input type="text" v-model="tmp.userid">
      </li>
      <li>
        <span>이름</span>
        <input type="text" v-model="tmp.username">
      </li>
      </ul>
        <button type="button" @click="getSearch">검색</button>
    </div>
    <div class="cont_inner">
      <p>| 검색 결과</p>
      <table class="list">
        <colgroup>
          <col width="5%">
          <col width="10%">
          <col width="20%">
          <col width="20%">
          <col width="20%">
          <col width="20%">
        </colgroup>
        <tr style="cursor: initial;">
          <th>No.</th>
          <th>국가</th>
          <th>ID</th>
          <th>이름</th>
          <th>연락처</th>
          <th>가입 일시</th>
        </tr>
        <tr v-for = "(row,index) in userdata" v-bind:key="index" v-on:click="userdetail(row.user_id)" >
          <td id="index">{{posttotal - ((currentpage-1)*20 + index)}}</td>
            <td v-if="row.country == 'KR'">대한민국</td>
            <td v-else-if="row.country == 'US'">미국</td>
            <td v-else-if="row.country == 'JP'">일본</td>
            <td v-else >중국</td>
          <td id="userid">{{row.user_id}}</td>
          <td id="name">{{row.name}}</td>
          <td id="phone">{{row.phone.replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/, '$1-$2-$3')}}</td>
          <td id="createat">{{row.createat.split(' ')[0]}} {{row.createat.split(' ')[1].substr(0,5)}}</td>
        </tr>
      </table>
      <div class="paging">
        <a class ="pagingFirst"  @click="getNextBeforePage('0')"/>
          <ul v-for="(n,index) in paging()" v-bind:key="index" @click="getPage(n)">
            <li  v-if="currentpage !== n" class = "Nothere">{{n}}</li>
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
      Search: {
        region: '',
        userid: '',
        username: '',
        min: '',
        max: ''
      },
      tmp: {
        region: '',
        userid: '',
        username: '',
        min: '',
        max: ''
      },
      userdata: null,
      currentpage: this.$route.query.page ? parseInt(this.$route.query.page) : 1,
      endpage: null,
      count: 20,
      posttotal: '',
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
    this.getUserList()
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
        this.currentpage = 1
        this.Search = this.tmp
        this.getUserList()
      } else {
        alert('유효하지 않은 날짜입니다. 날짜간격은 12개월 이내로, 시작일은 종료일보다 앞서서 설정해주세요')
        this.tmp.max = ''
      }
    },
    async getUserList (n) {
      await this.$axios.patch('http://localhost:9000/api/su/user/search', {
        'userid': this.Search.userid,
        'username': this.Search.username,
        'region': this.Search.region,
        'min': this.Search.min.replace(/-/g, ''),
        'max': this.Search.max.replace(/-/g, ''),
        'page': n === undefined ? this.currentpage : n,
        'count': this.count
      })
        .then((res) => {
          this.userdata = res.data.userdata
          this.posttotal = res.data.total
          this.endpage = parseInt((res.data.total) / this.count)
          this.endpage += ((res.data.total) % this.count) ? 1 : 0
        })
        .catch((err) => {
          console.log(err)
          alert('불러오기실패')
        })
    },
    userdetail (n) {
      this.$router.push('/user/' + n)
    },
    async getPage (n) {
      if (this.currentpage !== n) {
        await this.getUserList(n)
        this.currentpage = n
        this.$router.push({name: this.$route.name, query: {page: n}})
      }
    },
    getNextBeforePage (n) {
      if (n === '0' && this.currentpage > 1) {
        this.getPage(this.currentpage - 1)
      } else if (n === '1' && this.currentpage < this.endpage) {
        this.getPage(this.currentpage + 1)
      }
    }
  }
}
</script>

<style scoped>
#content {
  overflow: scroll;
}
#content table td {
  text-align: center;
}
.here {
  background-color: #3e61dc;
  color: #fff;
}

button {
  height: 30px;
  widows: 100px;
  bottom: 20px;
}

.Search {
  align-items: center;
  position: relative;
}

td#userid{
  text-align: left
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
