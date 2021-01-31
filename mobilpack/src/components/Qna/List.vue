<template>
  <div id='content'>
    <div class="title">
      <h1>| 문의 관리</h1>
      <h3>HOME > 서비스 관리 > 고객 문의</h3>
    </div>
    <div class="search" style="margin: 10px 0;">
      <ul>
        <li>
          <span>문의 유형</span>
          <select v-model="category">
            <option value="">전체</option>
            <option value="1">이용</option>
            <option value="2">오류</option>
            <option value="3">기타</option>
          </select>
        </li>
        <li>
          <span>제목</span>
          <input type="text" v-model="title">
        </li>
        <li class ="date" style="width: 370px">
          <span>문의 일시</span>
          <p class="date">
            <input type="date" v-model="min">
            <i>~</i>
            <input type="date" v-model="max">
          </p>
        </li>
        <li>
          <span>답변유무</span>
          <select v-model="answer">
            <option value="">전체</option>
            <option value="0">답변대기</option>
            <option value="1">답변완료</option>
          </select>
        </li>
      </ul>
      <button @click="getList">검색</button>
    </div>
    <div class="cont_inner">
      <table style="margin: 20px 0;">
        <colgroup>
          <col width="5%">
          <col width="10%">
          <col width="20%">
          <col width="15%">
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
        <!--tr v-for="(post,index) in List" v-bind:key="index">
          <td>{{index}}</td>
          <td>{{post.category}}</td>
          <td>{{post.title}}</td>
          <td>{{post.}}
        </tr-->
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      List: null,
      category: '',
      title: '',
      min: '',
      max: '',
      answer: '',
      page: 1,
      endpage: null,
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
  },
  methods: {
  }
}
</script>
