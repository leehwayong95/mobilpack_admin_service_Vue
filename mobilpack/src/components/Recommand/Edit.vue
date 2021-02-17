<template>
    <div class="scroll" id=content>
    <span class="title">
    <h1>추전 장소 관리</h1>
    <h2>HOME > 추천 장소 관리 > 추천 장소 수정</h2>
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
                style="width:850px; height:100px"
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
                  style="width:850px"
                  placeholder="#을 이용해 태그를 입력해주세요"
                  type="text"
                  v-model="tag"
                />
             </td>
             </tr>
             <tr>
             <th>사진</th>
             <td colspan="7" style="height:150px">
               <input ref="imageInput" type="file" hidden @change="onChangeImages">
               <v-btn type="button" @click="onClickImageUpload">이미지 업로드</v-btn>
               <v-img
               v-if="imageUrl" :src="imageUrl"
               ></v-img>
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
                style="width:800px; height:100px"
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
             <th rowspan="2">위치 정보</th><!--칸 나누기는(세로)는 rowspan 사용 -->
             <td colspan="7" style="width:800px; height:600px">
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
                <input type="checkbox" id="two" v-model="checkedValues" value="2">
                <label for="two">화요일</label>
                <input type="checkbox" id="three" v-model="checkedValues" value="3">
                <label for="three">수요일</label>
                <input type="checkbox" id="four" v-model="checkedValues" value="4">
                <label for="four">목요일</label>
                <input type="checkbox" id="five" v-model="checkedValues" value="5">
                <label for="five">금요일</label>
                <input type="checkbox" id="six" v-model="checkedValues" value="6">
                <label for="six">토요일</label>
                <input type="checkbox" id="seven" v-model="checkedValues" value="7">
                <label for="seven">일요일</label>
                <div>
                <select style="width:80px" v-model="openhour">
                <option v-for="(n,oh) in openhour" :key="oh" >{{n}}</option>
                </select>
                <select style="width:80px" v-model="openmin">
                <option v-for="(n,om) in openmin" :key="om" >{{n}}</option>
                </select>
                <span>~</span>
                <select style="width:80px" v-model="endhour">
                <option v-for="(n,eh) in endhour" :key="eh" >{{n}}</option>
                </select>
                <select style="width:80px" v-model="endmin">
                <option v-for="(n,em) in endmin" :key="em" >{{n}}</option>
                </select>
                </div>
             </td>
             <tr>
             <th>입장마감 시간</th>
             <td colspan="7">
               <select style="width:80px" v-model="endhour">
                <option v-for="(n,eh) in endhour" :key="eh" >{{n}}</option>
                </select>
                <select style="width:80px" v-model="endmin">
                <option v-for="(n,em) in endmin" :key="em" >{{n}}</option>
                </select>
             </td>
             </tr>
        </tbody>
        </table>
        <div class="center">
          <button class="centerbutton" style="background:  rgb(230, 120, 120)" >취소</button>
          <button class="centerbutton" @click="save">저장</button>
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
      address_lat: '',
      address_lng: '',
      address: '',
      phone: '',
      checkedValues: [],
      openhour: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14'],
      openmin: ['00', '10', '20', '30', '40', '50'],
      endhour: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'],
      endmin: ['00', '10', '20', '30', '40', '50'],
      Entrancehour: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'],
      Entrancemin: ['00', '10', '20', '30', '40', '50'],
      imageUrl: null,
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
        mapTypeControl: true
      },
      initLayers: ['BACKGROUND', 'BACKGROUND_DETAIL', 'POI_KOREAN', 'TRANSIT', 'ENGLISH', 'CHINESE', 'JAPANESE']
    }
  },
  methods: {
    onClickImageUpload () {
      this.$refs.imageInput.click()
    },
    onChangeImages (e) {
      console.log(e.target.files)
      const file = e.target.files[0] // Get first index in files
      this.imageUrl = URL.createObjectURL(file) // Create File URL
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
      window.open('/pop', '_blank')
    },
    save: function (y, x, address) {
      this.address_lat = y
      this.address_lng = x
      this.address = address
      console.log(this.address_lat)
      console.log(this.address_lng)
      console.log(this.address)
    }
  }
}
</script>

<style scoped>
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
  height: 100%;
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
