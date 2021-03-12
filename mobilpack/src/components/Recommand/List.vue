<template>
  <div id="content">
    <div class="title">
      <h1>추천 장소 관리</h1>
      <h3>HOME > 추천장소관리</h3>
    </div>
    <div class="search">
      <ul>
        <li>
          <span>카테고리</span>
          <select v-model="tmp.category">
            <option value="">전체</option>
            <option value="관광지">관광지</option>
            <option value="숙소">숙소</option>
            <option value="맛집">맛집</option>
          </select>
        </li>
        <li class="lang" style="min-width: 376px;">
          <span>등록언어</span>
          <multiselect
            v-model="tmp.selecttag"
            label="name"
            :options="language"
            track-by="value"
            :multiple="true"
            :tagable="true"
            @tag="addLanguageOption"
            :close-on-select="false"
            :searchable="false">
            <template template slot="selection">
            </template>
          </multiselect>
        </li>
        <li>
          <span>서비스상태</span>
          <select v-model="tmp.state">
            <option value="">전체</option>
            <option value="1">서비스 중</option>
            <option value="0">서비스 중지</option>
          </select>
        </li>
        <li>
          <span>추천장소명</span>
          <input type="text" v-model="tmp.title">
        </li>
      </ul>
      <button @click="getSearch">검색</button>
    </div>
    <div class="cont_inner">
      <div class="title">
        <p class="admintitle">| 검색 결과</p>
        <button @click="writeNewPost">신규등록</button>
      </div>
      <table class="list">
        <colgroup>
          <col width="5%">
          <col width="8%">
          <col width="20%">
          <col width="5%">
          <col width="4%">
          <col width="4%">
          <col width="4%">
          <col width="4%">
          <col width="5%">
          <col width="10%">
          <col width="20%">
          <col width="10%">
        </colgroup>
        <tr style="cursor: initial;">
          <th rowspan="2">No.</th>
          <th rowspan="2">카테고리</th>
          <th rowspan="2">추천장소명</th>
          <th rowspan="2">원본</th>
          <th colspan="4">등록언어</th>
          <th rowspan="2">댓글수</th>
          <th rowspan="2">등록자</th>
          <th rowspan="2">등록일시</th>
          <th rowspan="2">서비스상태</th>
        </tr>
        <tr>
          <th>한국어</th>
          <th>영어</th>
          <th>일본어</th>
          <th>중국어</th>
        </tr>
        <tr v-for="(i,index) in List" :key="index" @click="getPost(i.postindex)">
          <td>{{ListCount - (index+((page-1)*20))}}</td>
          <td>{{i.category}}</td>
          <td class="title">{{i.title}}</td>
          <td v-if = "i['default_lang'] === 'KR'">한국어</td>
          <td v-else-if = "i['default_lang'] === 'US'">영어</td>
          <td v-else-if = "i['default_lang'] === 'JP'">일본어</td>
          <td v-else>중국어</td>
          <td v-if="i.language & 1"> ○ </td>
          <td v-else></td>
          <td v-if="i.language & 2"> ○ </td>
          <td v-else></td>
          <td v-if="i.language & 4"> ○ </td>
          <td v-else></td>
          <td v-if="i.language & 8"> ○ </td>
          <td v-else></td>
          <td>{{i.count}}</td>
          <td v-if="i.name">{{i.name}}</td>
          <td v-else>삭제된 관리자</td>
          <td>{{i.date}}</td>
          <td v-if="i.state == 1" style="color: blue;">서비스중</td>
          <td v-else style="color: red;">서비스 중지</td>
        </tr>
      </table>
      <div class="paging">
      <a class ="pagingFirst"  @click="getNextBeforePage('0')"/>
        <ul v-for="(n,index) in paging()" v-bind:key="index" @click="getPage(n)">
          <li  v-if="page !== n" class = "Nothere">{{n}}</li>
          <li v-else class="here">{{n}}</li>
        </ul>
      <a class="pagingLast" @click="getNextBeforePage('1')"/>
    </div>
    </div>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
export default {
  components: {
    Multiselect
  },
  mounted () {
    for (let i of this.language) {
      this.Search.selecttag.push(i)
      this.tmp.selecttag.push(i)
    }
    this.getList()
  },
  data () {
    return {
      language: [ // 언어 선택 옵션
        {name: '한국어', value: 1},
        {name: '영어', value: 2},
        {name: '일본어', value: 4},
        {name: '중국어', value: 8}
      ],
      tmp: {
        category: '',
        language: '',
        title: '',
        state: '',
        selecttag: []
      },
      Search: {
        category: '',
        language: '',
        title: '',
        state: '',
        selecttag: []
      },
      page: this.$route.query.page ? parseInt(this.$route.query.page) : 1,
      List: '',
      ListCount: '',
      endpage: '',
      paging: function () {
        var pagenumber = []
        for (var i = 1; i <= this.endpage; i++) {
          pagenumber.push(i)
        }
        return pagenumber
      }
    }
  },
  updated () {
    console.log(this.tmp.selecttag)
    console.log(this.Search.selecttag)
  },
  methods: {
    addLanguageOption (newTag) {
      let value = {
        '한국어': 1,
        '영어': 2,
        '일본어': 4,
        '중국어': 8
      }
      const tag = {
        name: newTag,
        value: value[newTag]
      }
      this.language.push(tag)
      this.tmp.selecttag.push(tag)
    },
    getSearch () {
      this.Search = this.tmp
      this.getList()
    },
    async getList (n) {
      await this.$axios.get('http://localhost:9000/api/su/post/search', {
        params: {
          category: this.Search.category,
          language: this.getSelectSum(this.Search.selecttag),
          state: this.Search.state,
          titlename: this.Search.title,
          currentPage: n === undefined ? this.page : n,
          number: 20
        }
      })
        .then((res) => {
          this.ListCount = res.data.pageCount
          this.endpage = parseInt(res.data.pageCount / 20 + (res.data.pageCount % 20 > 0 ? 1 : 0))
          this.List = res.data.List
        })
    },
    getSelectSum (n) {
      // 선택 태그 value 총합
      let sum = 0
      for (let i of n) {
        sum += i.value
      }
      return sum
    },
    getPost (n) {
      this.$router.push('recommands/' + n)
    },
    getPage (n) {
      if (this.page !== n) {
        this.getList(n)
        this.page = n
        this.$router.push({name: this.$route.name, query: {page: n}})
      }
    },
    getNextBeforePage (n) {
      if (n === '0' && this.page > 1) {
        this.getPage(this.page - 1)
      } else if (n === '1' && this.page < this.endpage) {
        this.getPage(this.page + 1)
      }
    },
    writeNewPost () {
      this.$router.push({name: 'recommandregistrtion'})
    }
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css">
</style>

<style scoped>
div#content {
  overflow: auto;
}

div.search ul {
  display: flex;
  flex-direction: row;
  align-items: center;
}
div.search select {
  height: 40px;
}
div.search input {
  height: 40px;
}
div.cont_inner div.title {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 60px;
}
div.cont_inner div.title p{
  font-size: 18px;
  font-weight: 500;
  line-height: 2em;
}
div.cont_inner div.title button{
  height: 30px;
  width: 100px;
}
#content * td {
  text-align: center;
}
#content td.title {
  text-align: left;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.here {
  background-color: #3e61dc;
  color: #fff;
}
</style>
