<template>
  <div id="content">
    <div class="title">
      <h1>| 추천 장소 관리</h1>
      <h3>HOME > 서비스관리 > 추천장소관리</h3>
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
        <li class="lang" style="width: 26%;">
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
            placeholder="">
            <template template slot="selection">
            </template>
          </multiselect>
        </li>
        <li class ="date" style="width: 370px">
          <span>서비스상태</span>
        </li>
        <li>
          <span>추천장소명</span>
        </li>
      </ul>
      <button @click="test">검색</button>
    </div>
    <div class="cont_inner">
      <div class="title">
        <span>| 검색결과</span>
        <button>신규등록</button>
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
  },
  data () {
    return {
      tmp: {
        category: '',
        language: '',
        selecttag: []
      },
      Search: {
        category: '',
        language: '',
        selecttag: []
      },
      language: [
        {name: '한국어', value: '1'},
        {name: '영어', value: '2'},
        {name: '일본어', vaule: '4'},
        {name: '중국어', value: '8'}
      ],
      value: []
    }
  },
  methods: {
    addLanguageOption (newTag) {
      let value = ''
      switch (newTag) {
        case ('한국어'):
          value = 1
          break
        case ('영어'):
          value = 2
          break
        case ('일본어'):
          value = 4
          break
        case ('중국어'):
          value = 8
          break
      }
      const tag = {
        name: newTag,
        value: value
      }
      this.language.push(tag)
      this.tmp.selecttag.push(tag)
    },
    test () {
      console.log(this.tmp.language)
    }
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped>
div.search ul {
  display: flex;
  flex-direction: row;
  align-items: center;
}
div.search Multiselect{
  position: absolute;
}
</style>
