<template>
 <div class="scroll" id=content>
    <span class="title">
    <h1>추전 장소 번역 보기</h1>
    <h2>HOME > 추천 장소 관리 > 추천 장소 상세 > 추천 장소 번역 보기</h2>
    </span>
      <div class="cont_inner">
        <div class="indecate">
          <p  v-if="$route.name ==='translation'" class="admintitle">| 컨텐츠 번역  </p>
          <p class="admintitle">| 컨텐츠 번역 등록/수정 </p>
        </div>
        <div>
        <td v-if="$route.name ==='translation'">번역 컨텐츠는 원본을 기준으로 우측에 입력 가능합니다. 현재 한국어,일본어,영어,중국어 등록이 가능합니다<br>
        전체 컨테츠 중에서 번역이 필요한 항목만 요약되어 제공됩니다.<br>
        번역본을 신규 등록하거나, 수정하고자 할 경우 우측의 입력 언어를 선택한 후 [등록/수정] 버튼을 눌러주세요</td>
        <td v-else>전체 컨텐츠 중에서 번역이 필요한 항목만 요약되어 제공됩니다.</td>
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
          <td v-if="'KR'===copylanguage">한국어</td>
          <td v-if="'EN'===copylanguage">English</td>
          <td v-if="'JP'===copylanguage">日本語</td>
          <td v-if="'CN'===copylanguage">中國語</td>
          <td class="center">
            <select v-if="$route.name ==='translation'" style="width:200px" v-model="choicelanguage" @click="changelanguage">
              <option v-if="copylanguage != 'KR'" value="KR" >한국어</option>
              <option v-if="copylanguage != 'EN'" value="EN" >English</option>
              <option v-if="copylanguage != 'JP'" value="JP" >日本語</option>
              <option v-if="copylanguage != 'CN'" value="CN" >中國語</option>
            </select><!-- v-bind:disabled 이친구가 "" 안에 있는 조건이 됬을경우 언어를 선택 못하게 비활성화 해줍니다.  -->
             <select v-if="$route.name ==='translationedit'" style="width:200px" v-model="choicelanguage" v-bind:disabled="$route.name ==='translationedit'">
              <option v-if="copylanguage != 'KR'" value="KR" >한국어</option>
              <option v-if="copylanguage != 'EN'" value="EN" >English</option>
              <option v-if="copylanguage != 'JP'" value="JP" >日本語</option>
              <option v-if="copylanguage != 'CN'" value="CN" >中國語</option>
            </select>
          </td>
          </tr>
          <tr>
            <th>추천장소명</th>
           <td >{{copyplacename}}</td>
           <td v-if="$route.name ==='translation' && checkNolist ==='true' || checkNolist ===''" >{{ placename }}</td>
           <td v-if="$route.name ==='translation' && checkNolist ==='false'"></td>
           <td v-else-if="$route.name ==='translationedit'" >
            <input
            type="text"
            v-model="placename"
           />
           </td>
          </tr>
          <tr>
            <th>관광정보</th>
            <td style="height:200px">{{copyinfo}}</td>
            <td v-if="$route.name ==='translation' && checkNolist ==='true' || checkNolist ===''" >{{ info }}</td>
            <td v-if="$route.name ==='translation' && checkNolist ==='false'"></td>
            <td v-else-if="$route.name ==='translationedit'" >
              <textarea
                style="width:600px; height:200px"
                type="text"
                v-model="info"
            />
            </td>
          </tr>
           <tr>
            <th>태그</th>
            <td>{{copytag}}</td>
            <td v-if="$route.name ==='translation' && checkNolist ==='true' || checkNolist ===''">{{ tag }}</td>
            <td v-if="$route.name ==='translation' && checkNolist ==='false'"></td>
            <td v-else-if="$route.name ==='translationedit'"  >
               <input
                type="text"
                v-model="tag"
             />
            </td>
          </tr>
           <tr>
            <th>음성안내문구</th>
            <td  style="height:200px">{{copyvoice}}</td>
            <td v-if="$route.name ==='translation' && checkNolist ==='true' || checkNolist ===''">{{ voice }}</td>
            <td v-if="$route.name ==='translation' && checkNolist ==='false'"></td>
            <td v-else-if="$route.name ==='translationedit'" >
              <textarea
                style="width:600px; height:200px"
                type="text"
                v-model="voice"
            />
            </td>
          </tr>
           <tr>
            <th>주소</th>
            <td>{{copyaddress}}</td>
            <td v-if="$route.name ==='translation' && checkNolist ==='true' || checkNolist ===''">{{ address }}</td>
            <td v-if="$route.name ==='translation' && checkNolist ==='false'"></td>
            <td v-else-if="$route.name ==='translationedit'" >
               <input
                type="text"
                v-model="address"
             />
            </td>
          </tr>
          </tbody>
      </table>
      <div class="center">
          <button v-if="$route.name !== 'translation'" class="centerbutton" >취소</button>
          <button v-if="$route.name !== 'translation'" class="centerbutton" >저장</button>
           <button v-else class="centerbutton" @click="edit" >등록/수정</button>
        </div>
  </div>
 </div>
</template>

<script>
export default {
  data () {
    return {
      items: [],
      language: '', // COPY가 안붙은 변수들은 언어를 선택했을때DB파일 가져온것을 담아요
      placename: '',
      info: '',
      tag: '',
      voice: '',
      address: '',
      choicelanguage: '', // 입력 언어 리스트에서 언어 선택 한것
      copylanguage: this.$route.query.default, // COPY가 붙은 변수들은 상세페이지에서 선택한 원본의 데이터를 가져옵니다
      copypostindex: this.$route.query.postindex,
      copyplacename: this.$route.query.title,
      copyinfo: this.$route.query.content,
      copytag: this.$route.query.tag,
      copyvoice: this.$route.query.voice,
      copyaddress: this.$route.query.address,
      checkNolist: '' // 번역 게시글 DB파일을 가져올때 성공,실패여부를 체크합니다.(DB에 글이 없으면 공백으로 만들어야 합니다.)
    }
  },
  mounted () {
    console.log(this.$route.query.data)
  },
  methods: {
    edit () { // 수정/등록 버튼을 누를경우 해당DB 내용이 있으면 가져가고 없으면 공백으로 갑니다
      if (this.$route.path !== '/translationedit' && this.checkNolist === 'true') {
        this.$router.push({path: '/translationedit'})
        this.placename = this.items.title
        this.info = this.items.content
        this.tag = this.items.tag
        this.voice = this.items.voice_info
        this.address = this.items.address
      } else if (this.$route.path !== '/translationedit' && this.checkNolist === 'false') {
        this.$router.push({path: '/translationedit'})
        this.placename = ''
        this.info = ''
        this.tag = ''
        this.voice = ''
        this.address = ''
      }
    },
    changelanguage () { // 입력언어에서 언어를 선택할떄마다 각 언어에 맞는 DB파일을 가져옵니다 checkNolist에 true false로 성공/실패 기록
      this.$axios.get('http://localhost:9000/api/su/post/translate/info', {
        params: {
          postindex: this.copypostindex, language: this.choicelanguage}
      })
        .then((res) => {
          this.items = res.data[0]
          this.language = this.items.language
          this.placename = this.items.title
          this.info = this.items.content
          this.tag = this.items.tag
          this.voice = this.items.voice_info
          this.address = this.items.address
          this.checkNolist = 'true'
          console.log(this.checkNolist)
        })
        .catch((err) => {
          this.checkNolist = 'false'
          console.log(this.checkNolist)
          console.log(err)
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
</style>
