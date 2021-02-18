<template>
  <div id="content">
    <span class="title">
      <h1>| 회원 관리</h1>
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
        <li style="width: 370px;">
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
      <table>
        <colgroup>
          <col width="5%">
          <col width="20%">
          <col width="20%">
          <col width="20%">
          <col width="20%">
          <col width="20%">
        </colgroup>
        <tr>
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
          <td id="phone">{{row.phone}}</td>
          <td id="createat">{{row.createat}}</td>
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
      currentpage: 1,
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
      this.page = 1
      this.Search = this.tmp
      this.getUserList()
    },
    getUserList () {
      this.$axios.patch('http://localhost:9000/api/su/user/search', {
        'userid': this.Search.userid,
        'username': this.Search.username,
        'region': this.Search.region,
        'min': this.Search.min.replace(/-/g, ''),
        'max': this.Search.max.replace(/-/g, ''),
        'page': this.currentpage,
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
    getPage (n) {
      if (this.currentpage !== n) {
        this.currentpage = n
        this.getUserList()
      }
    },
    getNextBeforePage (n) {
      if (n === '0' && this.currentpage > 1) {
        this.currentpage--
      } else if (n === '1' && this.currentpage < this.endpage) {
        this.currentpage++
      }
      this.getUserList()
    }
  }
}
</script>

<style scoped>
#content {
  overflow: scroll;
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
</style>
