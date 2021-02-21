<template>
    <div class="scroll" id=content>
    <span class="title">
    <h1>추전 장소 관리</h1>
    <h2>HOME > 추천 장소 관리 > 상세화면</h2>
    </span>
    <section class="cont_inner">
        <h3 class="cont_title">|기본정보</h3>
        <table>
        <colgroup>
        <col style="width: 100px;">
        <col style="width: 100px;">
        <col style="width: 100px;">
        <col style="width: 200px;">
        <col style="width: 100px;">
        <col style="width: 200px;">
        <col style="width: 5%;">
        <col style="width: 10%;">
        </colgroup>
         <tbody>
             <tr>
             <th>입력 언어(원본)</th>
             <td colspan="3">
                <select style="width:200px" v-model="language">
                <option value="KR">한국어</option>
                <option value="US">영어</option>
                <option value="JP">일본어</option>
                <option value="CN">중국어</option>
                </select>
             </td>
             <th>카테고리</th>
             <td colspan="3">
                <select style="width:200px" v-model="select">
                <option >관광지</option>
                <option >숙소</option>
                <option >맛집</option>
                </select>
             </td>
             </tr>
             <tr>
             <th>추천 장소명</th>
             <td colspan="7">
                  <input
                  style="width:1000px height: 20px"
                  class="box"
                  type="text"
                  v-model="position"
                />
             </td>
             </tr>
             <tr>
             <th>관광정보</th>
                <td style="height:100px" colspan="7">
                <textarea
                style="width:1350px; height:100px"
                placeholder="관광객 APP에 제공할 추천 장소의 관광 정보를 입력해주세요"
                type="text"
                v-model="content"
                />
             </td>
             </tr>
             <tr>
             <th>태그</th>
             <td colspan="7">
               <input
                  style="width:1000px"
                  placeholder="#을 이용해 태그를 입력해주세요"
                  type="text"
                  v-model="tag"
                />
             </td>
             </tr>
             <tr>
             <th>사진</th><!--x 버튼에 적은 click.stop 은 다른 버튼 이벤트가 실행되지 않도록 자기것만하고 중지하는 명령문입니다. -->
             <!--$event 를 적으면 해당하는 이벤트 내용 전부를 받을수 있습니다. 본 게시판에는 적용하지는 않습니다 참고만.. -->
             <td class="Allbox" colspan="7" style="height:150px; padding-top: 10px;" >
               <input ref="imageInput" id= "selectfiles" type="file" hidden @change="onChangeImages">
               <button v-if= "imagecheck >= 1" class="pickbox" type="button" @click="onClickImageUpload"><img class="pick"
               v-if="imageUrl1" :src="imageUrl1"
               ><div><button class="Deletepick" @click.stop="deleteimage(1)" >X</button></div></button>
               <button v-else class="pickbox" type="button" @click="onClickImageUpload"><img class="pick"
               v-if="imageUrl1" :src="imageUrl1"
               ></button>
               <button v-if= "imagecheck >= 2" class="pickbox" type="button" @click="onClickImageUpload"><img class="pick"
               v-if="imageUrl2" :src="imageUrl2"
               ><div><button class="Deletepick"  @click.stop="deleteimage(2)" >X</button></div></button>
               <button v-else class="pickbox" type="button" @click="onClickImageUpload"><img class="pick"
               v-if="imageUrl2" :src="imageUrl2"
               ></button>
               <button v-if= "imagecheck >= 3" class="pickbox" type="button" @click="onClickImageUpload"><img class="pick"
               v-if="imageUrl3" :src="imageUrl3"
               ><div><button class="Deletepick" @click.stop="deleteimage(3)" >X</button></div></button>
               <button v-else class="pickbox" type="button" @click="onClickImageUpload"><img class="pick"
               v-if="imageUrl3" :src="imageUrl3"
               ></button>
               <button v-if= "imagecheck >= 4" class="pickbox" type="button" @click="onClickImageUpload"><img class="pick"
               v-if="imageUrl4" :src="imageUrl4"
               ><div><button class="Deletepick" @click.stop="deleteimage(4)">X</button></div></button>
               <button v-else class="pickbox" type="button" @click="onClickImageUpload"><img class="pick"
               v-if="imageUrl4" :src="imageUrl4"
               ></button>
               <!--<input ref="imageInput" id="5" type="file" hidden @change="onChangeImages($event, 5)">-->
               <button v-if= "imagecheck >= 5" class="pickbox" type="button" @click="onClickImageUpload"><img class="pick"
               v-if="imageUrl5" :src="imageUrl5"
               ><div><button class="Deletepick" @click.stop="deleteimage(5)">X</button></div></button>
                <button v-else class="pickbox" type="button" @click="onClickImageUpload"><img class="pick"
               v-if="imageUrl5" :src="imageUrl5"
               ></button>
             </td>
             </tr>
         </tbody>
        </table>
        <h3 class="cont_title">|음성 안내</h3>
        <table>
        <colgroup>
        <col style="width: 150px;">
        </colgroup>
        <tbody>
             <tr>
             <th>음성안내 문구</th>
                <td style="height:100px" colspan="7">
                <textarea
                style="width:1350px; height:100px"
                placeholder="관광객 APP에서 오디오 가이드로 제공할 음성 안내 문구를 입력해주세요 입력된 정보는 TTS로 제공됩니다."
                type="text"
                v-model="voice"
                />
             </td>
             </tr>
        </tbody>
        </table>
        <h3 class="cont_title">|이용 정보</h3>
        <table>
        <colgroup>
        <col style="width: 150px;">><!--1행(제목부분) 너비 조절 -->
        </colgroup>
        <tbody>
             <tr>
             <th rowspan="2">위치 정보</th><!--칸 나누기 (세로)는 rowspan 사용 -->
             <td colspan="7" style="width:1340px; height:600px">
               <div>
                <naver-maps
                  :height="mapHeight"
                  :width="mapWidth"
                  :mapOptions="mapOptions"
                  :initLayers="initLayers"
                  @load="onLoad">
                  <naver-marker :lat="33.49959" :lng="126.53126" @load="onMarkerLoaded"/>  <!-- 네이버 지도에서 마커를 찍는다 -->
                </naver-maps>
               </div>
             </td>
             </tr>
             <tr>
             <td colspan="7">
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
                <button class="centerbutton" @click="onMapMove">지도확인</button>
                <button class="rightbutton" @click="pop">지도에서 직접 선택하기</button>
             </td>
             </tr>
             <tr>
             <th>주소</th>
             <td colspan="7">
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
             <td colspan="7">
                 <input
                  placeholder="연락처('-'제외입력)"
                  class="box"
                  type="text"
                  v-model="phone"
                />
             </td>
             </tr>
             <tr>
             <th>운영시간</th>
             <td colspan="7" style="height:100px">
                <input type="checkbox" id="one" v-model="checkedValues" value="1">
                <label for="one">월요일</label>
                <input type="checkbox" id="two" v-model="checkedValues"  value="2">
                <label for="two">화요일</label>
                <input type="checkbox" id="three" v-model="checkedValues" value="4">
                <label for="three">수요일</label>
                <input type="checkbox" id="four" v-model="checkedValues" value="8">
                <label for="four">목요일</label>
                <input type="checkbox" id="five" v-model="checkedValues" value="16">
                <label for="five">금요일</label>
                <input type="checkbox" id="six" v-model="checkedValues" value="32">
                <label for="six">토요일</label>
                <input type="checkbox" id="seven" v-model="checkedValues" value="64">
                <label for="seven">일요일</label>
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
             <tr>
             <th>입장마감 시간</th>
             <td colspan="7">
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
          <button class="centerbutton" style="background:  rgb(230, 120, 120)" >취소</button>
          <button class="centerbutton" @click="submmitButton">저장</button>
        </div>
    </section>
    </div>
</template>

<script>
export default {
  data () {
    return {
      language: 'KR',
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
      imageUrl1: null,
      imageUrl2: null,
      imageUrl3: null,
      imageUrl4: null,
      imageUrl5: null,
      imagelist: [],
      imagecheck: 0,
      map: null, /* 지도를 사용하기 위해 map 객체를 생성 */
      marker: null, /* 마커를 조작하기 위해 marker 객체를 생성 */
      mapHeight: 600, /* 지도의 기본 위도 */
      mapWidth: 800, /* 지도의 기본 경도 */
      mapOptions: { /* 제주 시청을 기본값으로 설정함 */
        lat: 33.49959,
        lng: 126.53126,
        zoom: 16,
        zoomControl: true,
        zoomControlOptions: {position: 'TOP_RIGHT'},
        mapTypeControl: true,
        draggable: false,
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
  methods: {
    onClickImageUpload () {
      this.$refs.imageInput.click()
    },
    onChangeImages (e) {
      if (e.target.files[0].name.match('png') || e.target.files[0].name.match('jpg')) {
        const file = e.target.files[0]
        console.log(e)
        if (this.imagelist.length === 0) {
          this.imageUrl1 = URL.createObjectURL(file)
        } else if (this.imagelist.length === 1) {
          this.imageUrl2 = URL.createObjectURL(file)
        } else if (this.imagelist.length === 2) {
          this.imageUrl3 = URL.createObjectURL(file)
        } else if (this.imagelist.length === 3) {
          this.imageUrl4 = URL.createObjectURL(file)
        } else if (this.imagelist.length === 4) {
          this.imageUrl5 = URL.createObjectURL(file)
        }
        this.imagelist.push(file)
        console.log(this.imagelist)
        this.imagecheck = this.imagelist.length
      } else {
        alert('png,jpg 형식만 가능합니다.')
      }
    },
    deleteimage (n) { // splice(n:위치,i:n위치로부터 i개 삭제)
      if (n === 1) {
        this.imagelist.splice(0, 1)
        this.imageUrl1 = null
        if (this.imagelist.length >= 1) {
          this.imageUrl1 = this.imageUrl2
          this.imageUrl2 = this.imageUrl3
          this.imageUrl3 = this.imageUrl4
          this.imageUrl4 = this.imageUrl5
          this.imageUrl5 = null
        }
      } else if (n === 2) {
        this.imagelist.splice(1, 1)
        this.imageUrl2 = null
        if (this.imagelist.length >= 2) {
          this.imageUrl2 = this.imageUrl3
          this.imageUrl3 = this.imageUrl4
          this.imageUrl4 = this.imageUrl5
          this.imageUrl5 = null
        }
      } else if (n === 3) {
        this.imagelist.splice(2, 1)
        this.imageUrl3 = null
        if (this.imagelist.length >= 3) {
          this.imageUrl3 = this.imageUrl4
          this.imageUrl4 = this.imageUrl5
          this.imageUrl5 = null
        }
      } else if (n === 4) {
        this.imagelist.splice(3, 1)
        this.imageUrl4 = null
        if (this.imagelist.length >= 4) {
          this.imageUrl4 = this.imageUrl5
          this.imageUrl5 = null
        }
      } else if (n === 5) {
        this.imagelist.splice(4, 1)
        this.imageUrl5 = null
      }
      this.imagecheck = this.imagelist.length // 이미지 배열길이 갱신
    },
    onLoad (vue) { /* 네이버 지도 api 사용을 위해 객체 생성 */
      this.map = vue
    },
    onMapMove () { /** 위도 경도 값 입력시에 해당 위치로 이동하는 메소드 */
      this.map.setCenter({lat: this.address_lat, lng: this.address_lng})
      this.onMarkerMove()
    },
    onMarkerLoaded (vue) { /** 마커를 이용하기 위해 마커 객체 생성 */
      this.marker = vue.marker
    },
    onMarkerMove () {
      this.marker.setPosition({lat: this.address_lat, lng: this.address_lng})
    },
    pop () {
      window.v.Mom = this
      window.open('/pop', 'Popup')
    },
    save: function (y, x, address) {
      this.address_lat = y
      this.address_lng = x
      this.address = address
    },
    submmitButton () {
      const formData = new FormData()
      formData.append('default_lang', this.language)
      formData.append('category', this.select)
      formData.append('title', this.position)
      formData.append('content', this.content)
      formData.append('tag', this.tag)
      formData.append('files', this.imagelist)
      formData.append('voice_info', this.voice)
      formData.append('location', this.address_lat + ',' + this.address_lng)
      formData.append('address', this.address)
      formData.append('phone', this.phone)
      var repeat
      for (repeat = 0; repeat < this.checkedValues.length; repeat++) {
        this.openday = this.openday + this.checkedValues[repeat]
      }
      formData.append('openday', this.openday)
      formData.append('opentime', this.openhour + ':' + this.openmin)
      formData.append('closetime', this.endhour + ':' + this.endmin)
      formData.append('endtime', this.entrancehour + ':' + this.entrancemin)
      this.$axios.post('http://localhost:9000/api/su/post/create', formData)
        .then((response) => {
          this.result = response.data
        })
        .catch((ex) => {
          console.log(ex)
        })
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
  width: 1381px;
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
  min-height: calc(300%);/* 탑,사이드 말고 흰창 크기 늘리기 위해 추가함 */
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
  width: 50px;
  height: 30px;
}
input+label {
  padding-left: 5px;
  line-height: 5px;
  vertical-align: text-top;/* 체크박스와 글자 라인 맞추기 */
}
</style>
