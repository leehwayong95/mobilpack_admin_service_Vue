<template>
 <div class="scroll" id=content>
   <span class="title" v-if="$route.name === 'translation'">
      <h1>추천 장소 번역 보기</h1>
      <h3>HOME > 추천장소관리 > 추천장소상세 > 번역보기</h3>
    </span>
    <span class="title" v-else>
      <h1>추천 장소 변역 등록/수정</h1>
      <h3>HOME > 추천장소관리 > 추천장소상세 > 번역 등록/수정</h3>
    </span>
      <div class="cont_inner">
        <div class="indecate">
          <p  v-if="$route.name ==='translation'" class="admintitle">| 컨텐츠 번역  </p>
          <p  v-else class="admintitle">| 컨텐츠 번역 등록/수정 </p>
        </div>
        <div>
        <td class="textbox" v-if="$route.name ==='translation'"><p class="text">※ 번역 컨텐츠는 원본을 기준으로 우측에 입력 가능합니다. 현재 한국어,일본어,영어,중국어 등록이 가능합니다<br>
        ※ 전체 컨테츠 중에서 번역이 필요한 항목만 요약되어 제공됩니다.<br>
        ※ 번역본을 신규 등록하거나, 수정하고자 할 경우 우측의 입력 언어를 선택한 후 [등록/수정] 버튼을 눌러주세요</p></td>
        <td class="edittextbox" v-else><p class="text">※ 전체 컨텐츠 중에서 번역이 필요한 항목만 요약되어 제공됩니다.</p></td>
        </div>
      <table class="n">
        <colgroup>
          <col width="10%"><!-- 공백(1행1열) 너비 조절가능 -->
          <col width="45%"><!-- 원본(칸) 너비 조절가능 -->
          <col width="45%"><!-- 번역본(칸) 너비 조절가능 -->
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
          <td v-if="'US'===copylanguage">English</td>
          <td v-if="'JP'===copylanguage">日本語</td>
          <td v-if="'CN'===copylanguage">中國語</td>
          <td class="center">
            <center><!-- 이렇게 center 태그를 추가하면 특정구역에 자기가 원하는 위치에 넣을수 있습니다 -->
            <select v-if="$route.name ==='translation'" style="width:200px" v-model="choicelanguage" @click="changelanguage">
              <option v-if="copylanguage != 'KR'" value= '1'>한국어</option>
              <option v-if="copylanguage != 'US'" value= '2'>English</option>
              <option v-if="copylanguage != 'JP'" value= '4'>日本語</option>
              <option v-if="copylanguage != 'CN'" value= '8'>中國語</option>
            </select><!-- v-bind:disabled 이친구가 "" 안에 있는 조건이 됬을경우 언어를 선택 못하게 비활성화 해줍니다.  -->
             <select v-if="$route.name ==='translationedit'" style="width:200px" v-model="choicelanguage" v-bind:disabled="$route.name ==='translationedit'">
              <option v-if="copylanguage != 'KR'" value= '1' >한국어</option>
              <option v-if="copylanguage != 'US'" value= '2' >English</option>
              <option v-if="copylanguage != 'JP'" value= '4' >日本語</option>
              <option v-if="copylanguage != 'CN'" value= '8'>中國語</option>
            </select>
            </center>
          </td>
          </tr>
          <tr>
            <th>추천장소명</th>
           <td >{{copyplacename}}</td><!-- maxlength이 친구가 글자수 제한입니다  -->
           <td v-if="$route.name ==='translation' && checkNolist ==='true' || checkNolist ===''" >{{ placename }}</td>
           <td v-if="$route.name ==='translation' && checkNolist ==='false'"></td>
           <td v-else-if="$route.name ==='translationedit'" >
            <input
            type="text"
            v-model="placename"
            maxlength="50"
           />
           </td>
          </tr>
          <tr>
            <th>관광정보</th>
            <td style="height:200px; margin-bottom: 10px; margin-top: 10px;">{{copyinfo}}</td>
            <td v-if="$route.name ==='translation' && checkNolist ==='true' || checkNolist ===''" >{{ info }}</td>
            <td v-if="$route.name ==='translation' && checkNolist ==='false'"></td>
            <td v-else-if="$route.name ==='translationedit'" >
              <textarea
                style="max-width: 650px; height:200px"
                type="text"
                v-model="info"
                maxlength="5000"
            />
            </td>
          </tr>
           <tr>
            <th>태그</th>
            <td>{{copytag}}</td> <!-- @keyup.space 스페이스바를 눌렀을때 반응입니다 -->
            <td v-if="$route.name ==='translation' && checkNolist ==='true' || checkNolist ===''">{{ tag }}</td>
            <td v-if="$route.name ==='translation' && checkNolist ==='false'"></td>
            <td v-else-if="$route.name ==='translationedit'" @keyup.space = "clickSpace">
               <input
                type="text"
                v-model="tag"
                maxlength="50"
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
                style="max-width: 650px; height:200px"
                type="text"
                v-model="voice"
                maxlength='1000'
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
                maxlength='50'
                type="text"
                v-model="address"
             />
            </td>
          </tr>
          </tbody>
      </table>
      <div class="center">
          <button v-if="$route.name !== 'translation'" class="centerbutton" @click="cancle" >취소</button>
          <button v-if="$route.name !== 'translation' && checkNolist === 'false'" class="centerbutton" @click="save" >저장</button>
          <button v-if="$route.name !== 'translation' && checkNolist === 'true'" class="centerbutton" @click="update" >수정</button>
          <button v-if="$route.name !== 'translationedit'" class="centerbutton" @click="edit" >등록/수정</button>
          <button v-if="$route.name !== 'translationedit'" class="centerbutton" @click="back" >돌아가기</button>
        </div>
  </div>
 </div>
</template>

<script>
export default {
  data () {
    return {
      items: [],
      postindex: '',
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
  methods: {
    edit () { // 수정/등록 버튼을 누를경우 해당DB 내용이 있으면 가져가고 없으면 공백으로 갑니다
      if (this.choicelanguage !== '') { // 언어가 공백인 상태가 아니면 아래 함수를 실행
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
      } else { // 언어를 선택하지도 않고 등록/수정 버튼을 누르면 막아야하기 때문에 if else문을 추가함
        alert('언어를 선택해주세요')
      }
    },
    changelanguage () { // 입력언어에서 언어를 선택할떄마다 각 언어에 맞는 DB파일을 가져옵니다 checkNolist에 true false로 성공/실패 기록
      console.log(this.copylanguage)
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
        })
        .catch((err) => {
          this.checkNolist = 'false'
          console.log(this.checkNolist)
          console.log(err)
        })
    },
    clickSpace () { // 태그에서 스페이스바를 눌렀을때 자동 #추가입니다.
      this.tag = this.tag + '#'
    },
    back () {
      this.$router.push('/recommands/' + this.copypostindex)
    },
    cancle () {
      this.$router.push('/recommands')
    },
    save () {
      if (this.placename === '') {
        alert('제목을 입력해주세요')
      } else if (this.info === '') {
        alert('내용을 입력해주세요')
      } else if (this.tag === '') {
        alert('태그를 입력해주세요')
      } else if (this.address === '') {
        alert('주소를 입력해주세요')
      } else {
        this.$axios.post('http://localhost:9000/api/su/post/translate/create', {
          language: this.choicelanguage,
          postindex: this.copypostindex,
          title: this.placename,
          content: this.info,
          tag: this.tag,
          voice_info: this.voice,
          address: this.address
        })
          .then((res) => {
            if (res.data === 'TRUE') {
              alert('등록 성공')
              this.$router.push('/recommands/' + this.copypostindex)
            } else {
              console.log(res)
              console.log('등록 오류')
            }
          })
      }
    },
    update () {
      if (this.placename === '' &&
        this.placename === '' && this.info === '' && this.tag === '' &&
        this.voice === '' && this.address === '') {
        this.$axios.post('http://localhost:9000/api/su/post/translate/delete', {
          language: this.choicelanguage,
          postindex: this.copypostindex
        })
          .then((res) => {
            if (res.data === 'TRUE') {
              alert('삭제 성공')
              this.$router.push('/recommands/' + this.copypostindex)
            } else {
              console.log(res)
              console.log('삭제 실패')
            }
          })
      } else {
        this.$axios.post('http://localhost:9000/api/su/post/translate/update', {
          language: this.choicelanguage,
          postindex: this.copypostindex,
          title: this.placename,
          content: this.info,
          tag: this.tag,
          voice_info: this.voice,
          address: this.address
        })
          .then((res) => {
            if (res.data === 'TRUE') {
              alert('갱신 성공')
              this.$router.push('/recommands/' + this.copypostindex)
            } else {
              console.log(res)
              console.log('갱신 실패')
            }
          })
      }
    }
  }
}
</script>

<style scoped>
.scroll {
  overflow: scroll;
  background: lightgray;
}
.admintitle { /* 컨텐츠 번역 제목 꾸미기 */
  font-size: 20px;
  margin-top: 15px;
  margin-bottom: 15px;
  margin-left: 1px;
}
.centerbutton {
  width: 100px;
  height: 30px;
  margin-top: 50px;
  margin-left: 30px;
}
.n {
  margin-top: 20px;
}
.textbox {
  background: rgb(152, 155, 152);
  max-width: 100%; /*  반응형 고려했지만 정답은 아님 화면을 축소할경우 이 box만 반응못함 */
  width: 1530px;
  height: 65px;
  border-radius: 5px;
  align-items:center;
}
.edittextbox {
  background: rgb(152, 155, 152);
  max-width: 100%; /*  반응형 고려했지만 정답은 아님 화면을 축소할경우 이 box만 반응못함 */
  width: 1530px;
  height: 40px;
  border-radius: 5px;
  align-items:center;
}
.text {
  margin-top: 10px;
  margin-left: 20px;
}
textarea {
    display: block;
    width: 100%;
    height: 160px;
    padding: 10px;
    margin: 5px 0;
    border-color: #ddd;
    border-radius: 5px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    font-size: 14px;
    resize: none;
    outline: none;
}
</style>
