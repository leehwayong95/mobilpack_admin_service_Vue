<template>
  <div id="content">
    <div class = "Search">
      <div id="search_contry">
        <span>국가</span>
        <select name="region" v-model="region">
          <option value="">전체</option>
          <option value="KR">대한민국</option>
          <option value="US">미국</option>
          <option value="JP">일본</option>
          <option value="CN">중국</option>
        </select>
      </div>
      <div id="search_createat">
          <span>가입 기간</span>
          <div class="signin_date">
            <input type="date" v-model="min" max="9999-12-31">
            <span>~</span>
            <input type="date" v-model="max" max="9999-12-31">
          </div>
      </div>
      <div id="search_id">
        <span>ID</span>
        <input type="text" v-model="userid">
      </div>
      <div id="search_name">
        <span>이름</span>
        <input type="text" v-model="username">
      </div>
      <div class="btn">
        <button type="button" @click="getUserList">검색</button>
      </div>
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
        <tr v-for = "(row,index) in userdata" v-bind:key="index" v-on:click="userdetail(row.user_id)">
          <th>{{index + 1}}</th>
          <th>{{row.country}}</th>
          <th>{{row.user_id}}</th>
          <th>{{row.name}}</th>
          <th>{{row.phone}}</th>
          <th>{{row.createat}}</th>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      region: '',
      userid: '',
      username: '',
      min: '',
      max: '',
      userdata: null,
      currentpage: 1,
      endpage: null,
      count: 20
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
    getUserList () {
      this.$axios.patch('http://localhost:9000/api/su/user/search', {
        'userid': this.userid,
        'username': this.username,
        'region': this.region,
        'min': this.min.replace(/-/g, ''),
        'max': this.max.replace(/-/g, ''),
        'page': this.currentpage,
        'count': this.count
      })
        .then((res) => {
          this.userdata = res.data.userdata
          this.endpage = parseInt(res.data.total / this.count)
          this.endpage += (res.data.total % this.count) ? 1 : 0
        })
        .catch((err) => {
          console.log(err)
          alert('불러오기실패')
        })
    },
    userdetail (n) {
      alert(n + ' 회원 옾흔!')
    }
  }
}
</script>
