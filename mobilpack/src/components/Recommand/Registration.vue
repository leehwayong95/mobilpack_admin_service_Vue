<template>
    <div class="scroll" id=content>
    <span class="title">
    <h1>추천 장소 등록</h1>
    <h3>HOME > 추천장소관리 > 추천장소등록</h3>
    </span>
    <section class="cont_inner">
        <h3 class="cont_title">| 기본정보</h3>
        <table>
        <colgroup>
          <col style="width: 10%;">
          <col style="width: 40%;">
          <col style="width: 10%;">
          <col style="width: 40%;">
        </colgroup>
         <tbody>
             <tr>
             <th>입력 언어(원본)</th>
             <td>
                <select style="width:200px" v-model="language" v-on:change="languageSelect">
                  <option value="KR">한국어</option>
                  <option value="US">영어</option>
                  <option value="JP">일본어</option>
                  <option value="CN">중국어</option>
                </select>
             </td>
             <th>카테고리</th>
             <td>
                <select style="width:200px" v-model="select"> <!-- 옵션에 선택을 넣지 않으면 기본값으로도 선택이 나오지 않음-->
                  <option hidden>선택</option> <!-- 옵션에 hidden을 넣음으로써 기본값으로는 나오지만 리스트에는 나오지 않게 함 -->
                  <option >관광지</option>
                  <option >숙소</option>
                  <option >맛집</option>
                </select>
             </td>
             </tr>
             <tr>
             <th>추천 장소명</th> <!-- maxlength : 최대 글자수를 제한-->
             <td colspan="3">
                  <input
                  style="width:1000px height: 20px"
                  class="box"
                  type="text"
                  maxlength="50"
                  v-model="position"
                />
             </td>
             </tr>
             <tr>
             <th>관광정보</th>
                <td style="height:100px" colspan="3">
                <textarea
                style="width:98%; height:100px;white-space:pre-line;"
                placeholder="관광객 APP에 제공할 추천 장소의 관광 정보를 입력해주세요"
                type="text"
                maxlength="5000"
                v-model="content"
                />
             </td>
             </tr>
             <tr>
             <th>태그</th>
             <td colspan="3">
               <!-- 스페이스바 눌렀을 때 , #이 자동으로 입력되는 메소드(clickSpace)-->
               <!-- input 입력창을 클릭했을 떄, 아무것도 입력 안됬을 때 #이 자동으로 입력되는 메소드(clickFirst)-->
               <!-- input focus시 # 추가 (@focus)-->
               <input
                  style="width:98%"
                  placeholder="#을 이용해 태그를 입력해주세요"
                  type="text"
                  @focus="clickFirst()"
                  @keyup.space = "clickSpace"
                  @click = "clickFirst"
                  v-model="tag"
                />
             </td>
             </tr>
             <tr>
             <th>사진</th> <!-- fileList에 담긴 값에 따라 사진 버튼을 생성하게 함-->
             <!-- fileList에 0이 아닌 이미지 값이 담길 때 img 태그가 활성화 되어 미리보기가 나오고 삭제버튼이 활성화-->
             <td colspan="3">
               <div class="Allbox"  style="height:150px;width:98%;padding-top: 10px;">
                <input ref="imageInput" type="file" hidden @change="onChangeImages">
                <button v-for="(file,index) in fileList" v-bind:key = "index" class="pickbox" type="button" @click="onClickImageUpload"><img class="pick"
                v-if="file !== '0'" :src="urlSource(file)"
                ><div><button v-if= "fileList.length >= 1 && file != '0'" class="Deletepick" @click.stop="deleteimage(index)" >X</button></div></button>
                <h1 class="ment" style="weight:98%;color:#595959;">※ 이미지 파일(JPG,PNG)을 등록해주세요.(최대 5장)첫번째 사진이 대표 사진으로 사용됩니다.</h1>
               </div>
             </td>
             </tr>
         </tbody>
        </table>
        <h3 class="cont_title">| 음성 안내</h3>
        <table>
        <colgroup>
          <col style="width: 10%;"><!--1행(제목부분) 너비 조절 -->
          <col style="width: 90%;">
        </colgroup>
        <tbody>
             <tr>
             <th>음성안내 문구<br>(선택)</th>
                <td style="height:100px">
                <textarea
                style="width:98%; height:100px;white-space:pre-line;"
                placeholder="관광객 APP에서 오디오 가이드로 제공할 음성 안내 문구를 입력해주세요 입력된 정보는 TTS로 제공됩니다."
                type="text"
                v-model="voice"
                />
             </td>
             </tr>
        </tbody>
        </table>
        <h3 class="cont_title">| 이용 정보</h3>
        <table>
          <colgroup>
            <col style="width: 10%;"><!--1행(제목부분) 너비 조절 -->
            <col style="width: 90%;">
          </colgroup>
          <tbody>
            <tr>
              <th rowspan="2">위치 정보</th><!--칸 나누기 (세로)는 rowspan 사용 -->
              <td style="height:600px; padding: 0px;">
                <!-- 기본 높이, 길이를 정하고 mapOption은 지도 api의 여러 설정을 정한다.-->
                <!--initLayers는 지도의 기본 레이어를 설정함-->
                <!--maps를 인라인으로 작성할 경우 오류가 발생할 수 있음-->
                <naver-maps
                  :mapOptions="mapOptions"
                  :initLayers="initLayers"
                  @load="onLoad">
                  <naver-marker :lat="33.49959" :lng="126.53126" @load="onMarkerLoaded"/>  <!-- 네이버 지도에 마커 생성 -->
                </naver-maps>
              </td>
            </tr>
            <tr>
              <td>
                  <input
                    style="width: 200px;"
                    type="text"
                    v-model="address_lat"
                    placeholder="위도"
                  />
                  <input
                    style="width: 200px;"
                    type="text"
                    v-model="address_lng"
                    placeholder="경도"
                  />
                  <button class="centerbutton" style="background-color:#7f7f7f;" @click="onMapMove">지도확인</button> <!-- 위도 경도를 입력한뒤 버튼 누르면 해당 위치로 지도 화면 이동-->
                  <button class="rightbutton" style="background-color:#5b9bd5;" @click="pop">지도에서 직접 선택하기</button> <!-- window.open을 이용해서 지도 팝업창 띄움-->
              </td>
            </tr>
            <tr>
              <th>주소</th>
              <td>
                  <input
                    placeholder="주소입력"
                    class="box"
                    type="text"
                    v-model="address"
                  />
              </td>
            </tr>
            <tr>
              <th>연락처</th>
              <td>
                  <input
                    placeholder="연락처('-'제외입력)"
                    class="box"
                    type="text"
                    maxlength="15"
                    v-model="phone"
                  />
              </td>
            </tr>
            <tr>
              <th>운영시간</th>
              <td style="height:100px;">
                  <div>
                    <input type="checkbox" id="one" v-model="checkedValues" value=1>
                    <label for="one">월요일</label>
                    <input type="checkbox" id="two" v-model="checkedValues"  value=2>
                    <label for="two">화요일</label>
                    <input type="checkbox" id="three" v-model="checkedValues" value=4>
                    <label for="three">수요일</label>
                    <input type="checkbox" id="four" v-model="checkedValues" value=8>
                    <label for="four">목요일</label>
                    <input type="checkbox" id="five" v-model="checkedValues" value=16>
                    <label for="five">금요일</label>
                    <input type="checkbox" id="six" v-model="checkedValues" value=32>
                    <label for="six">토요일</label>
                    <input type="checkbox" id="seven" v-model="checkedValues" value=64>
                    <label for="seven">일요일</label>
                    <h1 style="text-align:right;display:block;float:right;">※ 체크하지 않은 요일은 휴무일로 지정됩니다</h1>
                  </div>
                  <div>
                    <select style="width:80px" v-model="openhour">
                    <option v-for="(n,oh) in hour" :key="oh" v-bind:value="n">{{n}}</option>
                    </select>
                    <select style="width:80px" v-model="openmin">
                    <option v-for="(n,om) in min" :key="om" v-bind:value="n">{{n}}</option>
                    </select>
                    <span>~</span>
                    <select style="width:80px" v-model="endhour">
                    <option v-for="(n,eh) in hour" :key="eh" v-bind:value="n">{{n}}</option>
                    </select>
                    <select style="width:80px" v-model="endmin">
                    <option v-for="(n,em) in min" :key="em" v-bind:value="n">{{n}}</option>
                    </select>
                  </div>
              </td>
            </tr>
            <tr>
              <th>입장마감 시간<br>(선택)</th>
              <td>
                <select style="width:80px" v-model="entrancehour">
                  <option v-for="(n,eh) in hour" :key="eh" v-bind:value="n">{{n}}</option>
                  </select>
                  <select style="width:80px" v-model="entrancemin">
                  <option v-for="(n,em) in min" :key="em" v-bind:value="n">{{n}}</option>
                  </select>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="center">
          <button class="centerbutton" style="background-color:#d9d9d9;color:#7f7f7f;" @click="cancelButton">취소</button>
          <button class="centerbutton" style="background-color:#7f7f7f;" @click="submmitButton">저장</button>
        </div>
    </section>
    </div>
</template>

<script>
export default {
  data () {
    return {
      language: 'KR',
      languageList: 0,
      select: '선택',
      position: '',
      content: '',
      tag: '',
      voice: '',
      phone: '',
      openday: 0,
      checkedValues: [],
      hour: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
      min: ['00', '10', '20', '30', '40', '50'],
      openhour: '',
      openmin: '',
      endhour: '',
      endmin: '',
      result: '',
      entrancehour: '',
      entrancemin: '',
      fileList: [],
      imagecheck: 0,
      map: null, /* 지도를 사용하기 위해 map 객체를 생성 */
      marker: null, /* 마커를 조작하기 위해 marker 객체를 생성 */
      mapHeight: 600, /* 지도의 기본 높이 */
      mapWidth: 1390, /* 지도의 기본 길이 */
      mapOptions: { /* 제주 시청을 기본 위도 경도로 설정 */
        lat: 33.49959,
        lng: 126.53126,
        zoom: 16, // 줌 확대 비율을 16으로 설정
        zoomControl: false, // 줌 확대, 축소 기능을 막음
        zoomControlOptions: {position: 'TOP_RIGHT'}, // 줌 컨트롤 바의 위치를 오른쪽 위로 설정함
        mapTypeControl: false, // 맵의 타입을 바꿀 수 있는 버튼 막음
        draggable: false, // 지도 인터랙션 끄기
        pinchZoom: false,
        scrollWheel: false,
        keyboardShortcuts: false,
        disableDoubleTapZoom: true,
        disableDoubleClickZoom: true,
        disableTwoFingerTapZoom: true
      },
      initLayers: ['BACKGROUND', 'BACKGROUND_DETAIL', 'POI_KOREAN', 'TRANSIT', 'ENGLISH', 'CHINESE', 'JAPANESE'],
      address_lat: '',
      address_lng: '',
      address: ''
    }
  },
  mounted () {
    for (var i = 0; i < 5; i++) { // 맨 처음에 버튼 5개를 생성하기 위해 fileList에 0을 5개 push함
      this.fileList.push('0')
    }
  },
  methods: {
    languageSelect (event) { // select에서 선택한 언어에 따라서 language 값을 변수에 넣음
      if (event.target.value === 'KR') {
        this.languageList = 1
      } else if (event.target.value === 'US') {
        this.languageList = 2
      } else if (event.target.value === 'JP') {
        this.languageList = 4
      } else if (event.target.value === 'CN') {
        this.languageList = 8
      }
    },
    onClickImageUpload () { // 숨겨져 있는 input 태그를 실행시키는 함수
      this.$refs.imageInput.click()
    },
    onChangeImages (e) {
      if (e.target.files[0].name.match('png') || e.target.files[0].name.match('jpg')) { // 사진 파일이 png나 jpg인 것을 확인
        const file = e.target.files[0]
        for (var repeat = 0; repeat < this.fileList.length; repeat++) {
          if (this.fileList[repeat] === '0') { // 만약 사진 확장자가 맞다면 빈 버튼에 맞는 배열에 사진 파일을 입력함
            this.fileList.splice(repeat, 1, file)
            break
          }
        }
      } else {
        alert('사진 파일은 JPG,PNG만 등록 가능합니다. 확인 후 다시 파일을 선택해주세요')
      }
    },
    deleteimage (n) { // splice(n:위치,i:n위치로부터 i개 삭제, x: 삭제한 부분에 삽입할 내용)
      this.fileList.splice(n, 1) // n 위치에 해당하는 파일 배열에서 하나를 삭제함
      this.fileList.push('0') // 그리고 버튼이 표출되어야 하기 때문에 0을 push함
    },
    urlSource (file) { // 미리보기용 Method
      var url = URL.createObjectURL(file) // 파일에서 경로를 추출해서 url 변수에 넣음
      return url
    },
    onLoad (vue) { /* 네이버 지도 api 사용을 위해 객체 생성 */
      this.map = vue
    },
    onMapMove () { /** 위도 경도 값 입력시에 해당 위치로 이동하는 메소드 */
      this.map.setCenter({lat: this.address_lat, lng: this.address_lng})
      this.onMarkerMove() // 마커도 해당 경로로 이동
    },
    onMarkerLoaded (vue) { /** 마커를 이용하기 위해 마커 객체 생성 */
      this.marker = vue.marker
    },
    onMarkerMove () { // 마커 이동하는 메소드
      this.marker.setPosition({lat: this.address_lat, lng: this.address_lng})
    },
    pop () { // 지도 팝업창 여는 메소드
      window.v.Mom = this // window.v.Mom에 이 페이지를 선언함
      window.open('/pop', 'Popup')
    },
    save: function (y, x, address) { // 지도 팝업창에서의 위경도와 주소를 받기 위한 메소드
      this.address_lat = y
      this.address_lng = x
      this.address = address
    },
    cancelButton () { // recommands로 이동하는 버튼
      this.$router.push({name: 'recommands'})
    },
    submmitButton () { // 값들을 spring단으로 보내는 버튼
      const formData = new FormData() // 파일도 보내기 위해서 formData 생성
      if (this.select === '선택') { // 필수 입력값 미입력 방지
        alert('카테고리를 입력해주세요')
        return
      } else if (this.position === '') {
        alert('추천장소명을 입력해주세요')
        return
      } else if (this.content === '') {
        alert('관광정보를 입력해주세요')
        return
      } else if (this.tag === '') {
        alert('태그를 입력해주세요')
        return
      } else if (this.phone === '') {
        alert('연락처를 입력해주세요')
        return
      } else if (this.checkedValues === []) {
        alert('요일을 입력해주세요')
        return
      } else if (this.openhour === '' || this.openmin === '') {
        alert('오픈 시간을 입력해주세요')
        return
      } else if (this.endhour === '' || this.endmin === '') {
        alert('종료 시간을 입력해주세요')
        return
      } else if (this.address_lat === '' || this.address_lng === '') {
        alert('위도, 경도를 입력해주세요')
        return
      } else if (this.address === '') {
        alert('주소를 입력해주세요')
        return
      }
      formData.append('default_lang', this.language) // formData에 기본 언어 append
      if (this.language === 'KR') { // 처음에 언어 리스트를 선택하지 않았을 때 기본으로 KR에 해당하는 언어 값 입력
        this.languageList = 1
      }
      formData.append('language', this.languageList) // 각 값들을 formData에 append
      formData.append('category', this.select)
      formData.append('title', this.position)
      formData.append('content', this.content.trim())
      if (this.tag.substr(this.tag.length - 1, 1) === '#') { // 태그 문자열의 맨 마지막이 #인 경우 #과 양끝 공백을 지우고 append
        this.tag = this.tag.substring(0, this.tag.length - 1).trim()
      }
      formData.append('tag', this.tag)
      formData.append('voice_info', this.voice)
      formData.append('location', this.address_lat + ',' + this.address_lng)
      formData.append('address', this.address)
      formData.append('phone', this.phone)
      var repeat
      for (repeat = 0; repeat < this.checkedValues.length; repeat++) { // 반복문으로 요일 값을 더함
        this.openday = this.openday + parseInt(this.checkedValues[repeat])
      }
      formData.append('openday', this.openday)
      formData.append('opentime', this.openhour + ':' + this.openmin)
      formData.append('closetime', this.endhour + ':' + this.endmin)
      if (this.entrancehour === '' || this.entrancemin === '') {
        var time = ''
        if (this.entrancemin === '' && this.entrancehour !== '') {
          time = this.entrancehour + ':00'
        }
        formData.append('endtime', time)
      } else {
        formData.append('endtime', this.entrancehour + ':' + this.entrancemin)
      }
      for (repeat = 0; repeat < this.fileList.length; repeat++) { // formData에는 List가 한번에 담기지 않음
        formData.append('files', this.fileList[repeat]) // for문을 이용해서 이렇게 나눠서 보내야 함
      }
      this.$axios.post('http://localhost:9000/api/su/post/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data' // 파일을 보내기 위해 content-Type을 설정함
        }})
        .then((response) => {
          if (response.data === 'JwtExpired') {
            alert('로그인이 만료되었습니다. 다시 로그인해주세요')
            this.$cookie.delete('authorization')
            this.$cookie.delete('name')
            this.$router.push('/')
          } else {
            this.result = response.data
            console.log(this.result)
            this.$router.push('/recommands/' + this.result)
          }
        })
    },
    clickSpace () {
      if (this.tag.trim().substr(this.tag.length - 2, 1) === '#') {
        this.tag = this.tag.trim()
      } else {
        this.tag = this.tag + '#' // 스페이스바를 누르면 자동으로 ,와 #을 추가하는 메소드
      }
    },
    clickFirst () {
      if (this.tag === '') {
        this.tag = this.tag + '#' // 처음에 input 입력을 눌렀을 때 아무것도 없으면 자동으로 # 입력하게 해주는 기능
      }
    }
  },
  watch: {
    phone () { // watch 절에서는 값이 변할때 처다보니까 변수명과 메소드 명이 같아야함
      this.phone = this.phone.replace(/[^0-9]/g, '')
    },
    tag: function (newValue, oldvalue) {
      var regExp = /[~!@$%^&*()]/gi // 특수 문자 제외를 위한 정규식 구문(#은 제외함)
      var obj = newValue[newValue.length - 1]
      if (regExp.test(obj) && (obj !== '#')) {
        alert('특수문자는 입력하실 수 없습니다.')
        this.tag = oldvalue // 특수문자를 지우는 구문
      }
    }
  }
}
</script>

<style scoped>
td > button, .btn_area button {
  padding: 0 0px;
}
.Allbox {
  display: flex;
  width: 98%;
}
.ment {
  padding:100px 0px;
}
.pickbox {/* 이미지 담기는 박스 */
  border: solid 1px gray;
  width: 130px;
  height: 130px;
  background: rgb(241, 236, 236);
  margin-left: 10px;
}
.pick {/* 이미지 크기조절 */
  width: 123px;
  height: 120px;
}
.Deletepick {
  width: 20px;
  height: 20px;
  background: rgb(190, 6, 6);
  position: relative;
  top: -125px;
  right: -55px;
}
.box {
  width: 40%;
}
.scroll {
  overflow: scroll;
  background: #fff;
}
.centerbutton {
  margin-right: 30px;
  width: 100px;
  height: 30px;
}
.cont_inner {
  height: 150%;
}
#content > .cont_inner {
  height: fit-content;/* 탑,사이드 말고 흰창 크기 늘리기 위해 추가함 */
}
.rightbutton {
  float: right; /* float  이 친구를 사용해서 수정 ,삭제 버튼을 오른쪽으로 보낼수 있습니다  */
  width: 200px;
  height: 30px;
}
.center {
  height: 100px;
  display:flex; /* 버튼을 가운데로 정렬시켜줌 */
  justify-content:center;/*  취소 저장버튼을 가운데로 정렬시켜줌 */
  align-items:center; /*(가로의 중앙을 맟춰줌! 공부 필요함) */
}
#content tr:hover {
  background: initial;/*css 초기화 */
  cursor: initial;
}
input, select {/* 요일 간격 */
  width: 30px;
  height: 30px;
}
input+label {
  padding-left: 5px;
  line-height: 5px;
  margin-right: 10px;
  vertical-align: text-top;/* 체크박스와 글자 라인 맞추기 */
}
div#vue-naver-maps {
  height: 100%;
  width: 100%;
}
</style>
