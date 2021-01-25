<template>
  <div class = "scroll" id=content>
    <span class="title">
    <h1>HOME</h1>
    <h3>서비스관리 > 관리자 관리</h3>
    </span>
    <div class="search">
        <ul>
         <li>
          <span>ID</span>
          <input type="text" v-model="id">
        </li>
        <li>
          <span>이름</span>
          <input type="text" v-model="name">
        </li>
        <li>
          <span>날짜</span>
          <p class="date"><input type="date" v-model="createat"> <i>~</i> <input type="date" v-model="updateat"></p>
        </li>
      </ul>
      <button v-on:click="search">검색</button>
    </div>
       <div class="cont_inner">
      <p>| 관리자 목록  <button class="move" @click="Register"> 신규등록</button> </p>
      <table>
        <colgroup>
          <col width="3%">
          <col width="4%">
          <col width="5%">
          <col width="7%">
          <col width="5%">
          <col width="5%">
          <col width="10%">
        </colgroup>
        <thead>
          <tr>
            <th>No</th>
            <th>Id</th>
            <th>이름</th>
            <th>연락처</th>
            <th>이메일</th>
            <th>등록일시</th>
            <th>수정일시</th>
          </tr>
        </thead>
        <tbody>
          <tr>
             <tr v-for="(p,idx) in items" :key="idx" @click="rowClick(p.admin_id)">
            <td>index</td>
            <td>{{ p.admin_id }}</td>
            <td>{{ p.name }}</td>
            <td>{{ p.phone }}</td>
            <td>{{ p.email }}</td>
            <td>{{ p.createat }}</td>
            <td>{{ p.updateat }}</td>
          </tr>
            </tbody>
      </table>
      <div class="test4">
         <a v-for="(n,index) in paging()" :key="index" href="javascript:;" @click="ckpage(`${n}`)">{{n}}</a>
      </div>
  </div>
  </div>
</template>

<script>
export default {
  mounted () {
    // (페이징)항목 가져오기
    this.$axios.get('http://localhost:9000//api/su/admin/list', {params: { Currentpage: 1, Number: 20 }})
      .then((res) => {
        this.items = res.data
      })
      .catch((err) => {
        console.log(err)
      })
      // (페이징) DB리스트 항목에 따른 몇 페이지 필요한지 반환함
    this.$axios.get('http://localhost:9000//api/su/admin/listcount', {params: { Number: 20 }})
      .then((res) => {
        this.end_page = res.data
      })
      .catch((err) => {
        console.log(err)
      })
  },
  data () {
    return {
      id: '',
      name: '',
      createat: '',
      updateat: '',
      Number: '',
      items: [], // DB리스트 담는곳
      // (페이징)
      Currentpage: '',
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
      this.$axios.get('http://localhost:9000//api/su/admin/listsearch', {params: { Currentpage: 1, Number: 20, id: this.id, name: this.name, createat: this.createat, updateat: this.updateat }})
        .then((res) => {
          this.items = res.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    Register () {
      this.$router.push('/adminregistration')
    },
    rowClick (id) {
      this.$router.push({
        path: '/admindetails',
        query: {adminID: id}
      })
    },
    ckpage (n) {
      console.log(n)
      if (this.Currentpage !== n) {
        this.Currentpage = n
        this.GetList()
      }
    },
    GetList () {
      this.$axios.get('http://localhost:9000//api/su/admin/list', {params: { Currentpage: this.Currentpage, Number: 20 }})
        .then((res) => {
          this.items = res.data
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>

<style scoped>
.test4 {
  display:flex; /* 페이징을 가운데로 정렬시켜줌 */
  justify-content:center;/*  페이징을 가운데로 정렬시켜줌 */
  align-items:center; /* 없어도 되는 놈 공부는 필요함 */
}
.scroll {
  overflow: scroll;
  background: lightgray;
}
.cont_inner {
  position: relative;
  height: 100%;
  min-height: calc(100vh - 239px);
  margin-top: 20px;
  padding: 0 30px 30px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
}
.move {
  float: right;/*  신규등록 위치 */
}
</style>
