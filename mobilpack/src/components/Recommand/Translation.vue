<template>
 <div class="scroll" id=content>
    <span class="title">
    <h1>추전 장소 번역 보기</h1>
    <h2>HOME > 추천 장소 관리 > 추천 장소 상세 > 추천 장소 번역 보기</h2>
    </span>
      <div class="cont_inner">
        <div class="indecate">
          <p class="admintitle">| 컨텐츠 번역  </p>
        </div>
        <div>
        <td>번역 컨텐츠는 원본을 기준으로 우측에 입력 가능합니다. 현재 한국어,일본어,영어,중국어 등록이 가능합니다<br>
        전체 컨테츠 중에서 번역이 필요한 항목만 요약되어 제공됩니다.<br>
        번역본을 신규 등록하거나, 수정하고자 할 경우 우측의 입력 언어를 선택한 후 [등록/수정] 버튼을 눌러주세요</td>
        </div>
      <table>
        <colgroup>
          <col width="30%"><!-- 공백(1행1열) 너비 조절가능 -->
          <col width="100%"><!-- 원본(칸) 너비 조절가능 -->
          <col width="100%"><!-- 번역본(칸) 너비 조절가능 -->
        </colgroup>
        <thead>
          <tr>
            <th></th>
            <th>원본</th>
            <th>번역본</th>
          </tr>
        </thead>
        <tbody>
          <tr>
          <th>입력 언어</th>
          <td >{{ items.language }}</td>
          <td class="center">
            <select style="width:200px" v-model="language">
            <option @click="changelanguage" >한국어</option>
            <option @click="changelanguage">English</option>
            <option @click="changelanguage">日本語</option>
            <option @click="changelanguage">中國語</option>
            </select>
          </td>
          </tr>
          <tr>
            <th>추천장소명</th>
           <td ></td>
           <td >{{ items.title }}</td>
          </tr>
          <tr>
            <th>관광정보</th>
            <td style="height:200px"></td>
            <td>{{ items.content }}</td>
          </tr>
           <tr>
            <th>태그</th>
            <td></td>
            <td>{{ items.tag }}</td>
          </tr>
           <tr>
            <th>음성안내문구</th>
            <td  style="height:200px"></td>
            <td>{{ items.voice_info }}</td>
          </tr>
           <tr>
            <th>주소</th>
            <td></td>
            <td>{{ items.address }}</td>
          </tr>
          </tbody>
      </table>
      <div class="center">
          <button class="centerbutton" @click="edit" >등록/수정</button>
        </div>
  </div>
 </div>
</template>

<script>
export default {
  data () {
    return {
      language: '',
      items: []
    }
  },
  mounted () {
    this.$axios.get('http://localhost:9000/api/su/post/translate/info', {
      params: {
      // postindex: this.$route.query.items.postindex, language: this.$route.query.items.language}
        postindex: '8', language: 'EN'}
    })
      .then((res) => {
        this.items = res.data[0]
        console.log(res)
        console.log(this.items)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  methods: {
    edit () {
      this.$router.push({
        path: '/translationedit',
        query: {index: this.items.postindex, language: this.items.language}
      })
    },
    changelanguage () {
      this.$axios.post('http://localhost:9000//api/su/notice/edit', {
        postindex: this.$route.query.items.postindex,
        id: this.id,
        language: this.language,
        title: this.title,
        content: this.content,
        topsetting: this.topsetting
      })
        .then((res) => {
          if (res.data === 'ok') {
            console.log(res)
            alert('등록 성공')
            this.$router.push('/notice')
          } else {
            console.log(res)
            console.log('등록 실패 다시 작성해주세요')
          }
        })
    }
  }
}
</script>

<style scoped>
.scroll {
  overflow: scroll;
  background: lightgray;
}
.admintitle { /* 관리자 목록 버튼 */
  font-size: 20px;
  margin: 5px;/* 관리자 목록 글자 박스에 간격 벌리기 */
}
.centerbutton {
  width: 100px;
  height: 30px;
  margin-top: 50px;
}
.center {
  display:flex; /* 버튼을 정렬시켜줌 */
  justify-content:center;/*  버튼을 가운데로 정렬시켜줌 */
  align-items:center;/*  해당하는 열에 가운데로 정렬 */
}
</style>
