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
        <div class="indecate">
          <p class="admintitle">| 관리자 목록   </p>
          <button class="joinbutton" @click="Register"> 신규등록</button>
        </div>
      <table>
        <colgroup>
          <col width="10%"><!-- No 너비를 조절가능 -->
          <col width="10%"><!-- ID 너비를 조절가능 -->
          <col width="10%"><!-- 이름 너비를 조절가능 -->
          <col width="15%"><!-- 연락처 너비를 조절가능 -->
          <col width="15%"><!-- email 너비를 조절가능 -->
          <col width="15%"><!-- 등록일시 너비를 조절가능 -->
          <col width="15%"><!-- 수정일시 너비를 조절가능 -->
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
    this.$axios.get('http://localhost:9000//api/su/admin/listsearch', {params: { Currentpage: 1, Number: this.Number, id: this.id, name: this.name, createat: this.createat, updateat: this.updateat }})
      .then((res) => {
        console.log(res)
        this.items = res.data.result
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
  data () {
    return {
      id: '',
      name: '',
      createat: '',
      updateat: '',
      Number: 20,
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
      this.$axios.get('http://localhost:9000//api/su/admin/listsearch', {params: { Currentpage: 1, Number: this.Number, id: this.id, name: this.name, createat: this.createat, updateat: this.updateat }})
        .then((res) => {
          console.log(res)
          this.items = res.data.result
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
        this.search()
      }
    },
    GetList () {
      this.$axios.get('http://localhost:9000//api/su/admin/list', {params: { Currentpage: this.Currentpage, Number: this.Number }})
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
.joinbutton { /* 신규등록 버튼 */
  /* float: right; 신규등록 위치 */
  font-size: 15px;
  height: 40%;
  width: 90px;
}
.admintitle { /* 관리자 목록 버튼 */
  font-size: 20px;
}
</style>
