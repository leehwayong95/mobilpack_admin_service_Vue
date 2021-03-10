<template>
  <div class = "scroll" id=content>
    <span class="title">
    <h1>관리자 관리</h1>
    <h3>HOME > 관리자 관리</h3>
    </span>
    <div class="search">
        <ul>
         <li>
          <span>ID</span>
          <input type="text" v-model="id" v-on:keyup.enter="search">
        </li>
        <li>
          <span>이름</span>
          <input type="text" v-model="name" v-on:keyup.enter="search">
        </li>
        <li>
          <span>날짜</span>
          <p class="date"><input type="date" v-model="createat" max="2025-12-30" >
          <i>~</i>
          <input type="date" v-model="updateat" max="2025-12-31"></p>
        </li>
      </ul>
      <button v-on:click="search">검색</button>
    </div>
      <div class="cont_inner">
          <p class="admintitle">| 관리자 목록</p>
          <button class="joinbutton" @click="Register"> 신규등록</button>
      <table class="list">
        <colgroup>
          <col width="40px"><!-- No 너비를 조절가능 -->
          <col width="8%"><!-- ID 너비를 조절가능 -->
          <col width="7%"><!-- 이름 너비를 조절가능 -->
          <col width="10%"><!-- 연락처 너비를 조절가능 -->
          <col width="8%"><!-- email 너비를 조절가능 -->
          <col width="8%"><!-- 등록일시 너비를 조절가능 -->
          <col width="8%"><!-- 수정일시 너비를 조절가능 -->
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
        <tbody><!-- ^:문자 시작위치 , {n}: 음이아닌 정수 n개를 찾는다. ex o{2} ==>food 에 oo 2개를 찾음, | : 2개이상의 조건 or, []: 문자 집합 $: 문자 끝 위치  -->
          <tr v-for="(p,idx) in items" :key="idx" v-show="Currentpage" @click="rowClick(p.admin_id)">
            <td>{{ (listtotal)-(20*(page-1)+(idx))}}</td>
            <td>{{ p.admin_id }}</td>
            <td>{{ p.name }}</td>
            <td>{{ p.phone.replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/,"$1-$2-$3")}}</td>
            <td>{{ p.email }}</td>
            <td>{{ p.createat.substring(0,16) }}</td>
            <td v-if="p.updateat=== null">{{ p.updateat }}</td>
            <td v-else>{{ p.updateat.substring(0,16) }}</td>
          </tr>
        </tbody>
      </table>
      <div class="paging">
        <a class="pagingFirst"/>
          <ul v-for="(n,index) in paging()" :key="index" href="javascript:;" >
            <li v-if="page !== n" @click="ckpage(n)">{{n}}</li>
            <li v-else class="Currentpage">{{n}}</li>
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
      Num: '',
      id: '',
      name: '',
      createat: '',
      updateat: '',
      fixid: '',
      fixname: '',
      fixcreateat: '',
      fixupdateat: '',
      Number: 20, // 게시글 수량 제한
      listtotal: '', // 리스트 컬럼수
      items: [], // DB리스트 담는곳
      // (페이징)
      Currentpage: 1,
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
  // watch: {
  //   // watch: {  주시할 변수명: 실행할 콜백함수(newValue, oldValue) }
  //   updateat: function (newValue, oldvalue) {
  //     var Plusyear = this.$moment(this.createat).add(12, 'months').add(1, 'd')
  //     Plusyear = this.$moment(Plusyear).format('YYYY-MM-DD')
  //     if (newValue > Plusyear) {
  //       alert('날짜 최대 간격은 12개월 입니다')
  //       this.updateat = Plusyear
  //     }
  //   }
  // },
  methods: {
    search () {
      var Plusyear = this.$moment(this.createat).add(12, 'months').add(1, 'd')
      Plusyear = this.$moment(Plusyear).format('YYYY-MM-DD')
      if (this.createat > this.updateat) {
        alert('시작일은 종료일보다 앞서서 설정해주세요.')
        this.updateat = ''
      } else if (this.createat === '' && this.createat < this.updateat) {
        alert('시작 날짜를 선택하셔야 합니다.')
        this.updateat = ''
      } else if (this.updateat > Plusyear) {
        alert('날짜 최대 간격은 12개월 입니다')
        this.updateat = Plusyear
      } else {
        this.fixid = this.id
        this.fixname = this.name
        this.fixcreateat = this.createat
        this.fixupdateat = this.updateat
        this.page = 1
        this.pagingmove()
      }
    },
    pagingmove () {
      this.$axios.get('http://localhost:9000//api/su/admin/listsearch', {
        params: {
          Currentpage: this.page,
          Number: this.Number,
          id: this.fixid,
          name: this.fixname,
          createat: this.fixcreateat,
          updateat: this.fixupdateat
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
    Register () {
      this.$router.push('/adminregistration')
    },
    rowClick (id) {
      this.$router.push({
        path: '/admindetails',
        query: {adminID: id, page: this.page}
      })
    },
    ckpage (n) {
      if (this.page !== n) {
        this.page = n
        this.pagingmove()
        this.$router.push({name: this.$route.name, query: {page: n}})
      }
    }
  }
}
</script>

<style scoped>
button.joinbutton{
    position: absolute;
    right: 30px;
    top: 20px;
    width: 100px;
    height: 30px;
    padding: 0 15px;
}
#content table td {
  text-align: center;
}
#content > .search > button {
    right: 30px;
}
.Currentpage {
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
