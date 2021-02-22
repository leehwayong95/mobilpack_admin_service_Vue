<template>
 <div class="scroll" id=content>
    <span class="title">
    <h1>추전 장소 번역 보기</h1>
    <h2>HOME > 추천 장소 관리 > 추천 장소 상세 > 추천 장소 번역 보기</h2>
    </span>
      <div class="cont_inner">
        <div class="indecate">
          <p class="admintitle">| 컨텐츠 번역 등록/수정 </p>
        </div>
        <div>
        <td>전체 컨텐츠 중에서 번역이 필요한 항목만 요약되어 제공됩니다.</td>
        </div>
      <table>
        <colgroup>
          <col width="60%"><!-- 공백(1행1열) 너비 조절가능 -->
          <col width="150%"><!-- 원본(칸) 너비 조절가능 -->
          <col width="150%"><!-- 번역본(칸) 너비 조절가능 -->
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
          <td ></td>
          <td class="center">
            <select style="width:200px" v-model="language">
            <option >한국어</option>
            <option >English</option>
            <option >日本語</option>
            <option >中國語</option>
            </select>
          </td>
          </tr>
          <tr>
            <th>추천장소명</th>
           <td ></td>
           <td >
            <input
            type="text"
            v-model="placename"
           />
           </td>
          </tr>
          <tr>
            <th>관광정보</th>
            <td style="height:200px"></td>
            <td>
            <textarea
                style="width:600px; height:200px"
                type="text"
                v-model="info"
           />
            </td>
          </tr>
           <tr>
            <th>태그</th>
            <td></td>
            <td>
             <input
                type="text"
                v-model="tag"
             />
            </td>
          </tr>
           <tr>
            <th>음성안내문구</th>
            <td  style="height:200px"></td>
            <td>
            <textarea
                style="width:600px; height:200px"
                type="text"
                v-model="voice"
            />
            </td>
          </tr>
           <tr>
            <th>주소</th>
            <td></td>
            <td>
             <input
                type="text"
                v-model="adress"
             />
            </td>
          </tr>
          </tbody>
      </table>
      <div class="center">
        <button class="centerbutton" >취소</button>
        <button class="centerbutton" >저장</button>
        </div>
  </div>
 </div>
</template>

<script>
export default {
  data () {
    return {
      language: this.$route.query.items.language,
      placename: this.$route.query.items.title,
      info: this.$route.query.items.content,
      tag: this.$route.query.items.tag,
      voice: this.$route.query.items.voice_info,
      adress: this.$route.query.items.address,
      items: []
    }
  },
  mounted () {
    this.$axios.get('http://localhost:9000/api/su/post/translate/info', {
      params: {
        postindex: this.$route.query.items.index, language: this.$route.query.items.language}
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
    cancel () {
      this.$router.push({
        path: '/translationedit',
        query: {index: this.items.postindex, language: this.items.language}
      })
    },
    update () {
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
            this.$router.push('/recommandsdetails')
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
  margin-left: 30px;
}
.center {
  display:flex; /* 버튼을 정렬시켜줌 */
  justify-content:center;/*  버튼을 가운데로 정렬시켜줌 */
  align-items:center;/*  해당하는 열에 가운데로 정렬 */
}
textarea {
    margin: 10px 0;
}
</style>
