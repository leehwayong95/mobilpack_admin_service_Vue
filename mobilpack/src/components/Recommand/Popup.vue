<template>
  <div id="map" style="display:block;">
    <div id="mapbox" style="display:block;width:100%;height:100%;position:fixed;left:0;top:0;">
      <!--네이버맵 api 표출 부분-->
      <naver-maps
        :mapOptions="mapOptions"
        :initLayers="initLayers"
        @load="onLoad">
        <naver-marker :lat="33.49959" :lng="126.53126" @load="onMarkerLoaded"/>  <!-- 네이버 지도에서 마커를 찍는다 -->
      </naver-maps>
    </div>
    <!--검색창 부분-->
    <div id="searchbox" style="display:block;position:fixed;top:10px;left:20px;">
        <input
        v-model="searchdata"
        style="width:350px;height:40px;"
        placeholder="주소를 입력하세요"
        v-on:keyup.enter="searchbutton">
        <button style="width:40px;height:40px;" @click="searchbutton">검색</button>
        <div v-show="isActive" style="top:50px;left:20px;width:400px;height:40px;">
          <ul class="r" tabindex="0">
            <li tabindex="-1" v-for="(item, index) in regionList"
            v-bind:key="index" @click="listButton(item.y,item.x,item.address_name)">
              <span>{{item.place_name}}</span>
              <span style="color:blue;"><br>{{item.address_name}}</span>
            </li>
          </ul>
        </div>
        <button style="height:30px;width:100px;position:fixed;top:20px;right:30px;" v-on:click="saveButton(save_address_lat,save_address_lng,save_address)">
          포인트 저장</button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      map: null,
      marker: null,
      isActive: false,
      regionList: [], /* 지역 이름으로 된 리스트  */
      searchdata: '',
      searchaddress: '',
      save_address_lat: '',
      save_address_lng: '',
      save_address: '',
      sendData: [],
      output: {},
      mapOptions: { /* 제주 시청을 기본값으로 설정함 */
        lat: 33.49959,
        lng: 126.53126,
        zoom: 16,
        zoomControl: true,
        zoomControlOptions: {position: 9, style: 2}
      },
      initLayers: ['BACKGROUND', 'BACKGROUND_DETAIL', 'POI_KOREAN', 'TRANSIT', 'ENGLISH', 'CHINESE', 'JAPANESE']
    }
  },
  mounted () { // 검색기능은 카카오 지도 api를 이용했기 때문에 인증키를 받아와야 한다
    this.$axios.defaults.headers.common['Authorization'] = 'KakaoAK 6bb3f20cedd0dea495fe5eeda9af7d9c'
    window.addEventListener('resize', this.handleResize)
  },
  methods: {
    onLoad (vue) { // 처음에 지도 객체를 생성함
      this.map = vue
      this.handleResize()
    },
    handleResize () { // 지도 사이즈 재설정
      this.mapSize.width = document.getElementById('map').offsetWidth
      this.mapSize.height = document.getElementById('map').offsetHeight
      this.map.setSize(this.mapSize)
    },
    searchbutton () {
      console.log(this.searchdata)
      /* 카카오 API에 접근하기 위한 key 값을 담는다 */
      this.$axios.get('https://dapi.kakao.com/v2/local/search/keyword.json?query=' + this.searchdata)
        .then(response => {
          this.regionList = response.data.documents
          this.isActive = true
        })
        .catch((ex) => {
          console.log(ex)
        })
    },
    onMapMove (y, x) { /** 위도 경도 값 입력시에 해당 위치로 이동하는 메소드 */
      this.map.setCenter({lat: y, lng: x})
    },
    onMarkerLoaded (vue) { /** 마커를 이용하기 위해 마커 객체 생성 */
      this.marker = vue.marker
    },
    listButton (y, x, address) { // 리스트에서 해당 지역을 클릭했을 때 마커 이동하고 위경도 및 주소값 변수에 저장
      this.marker.setPosition({lat: y, lng: x})
      this.onMapMove(y, x)
      this.save_address_lat = y
      this.save_address_lng = x
      this.save_address = address
      console.log(this.save_address_lat)
      console.log(this.save_address_lng)
      console.log(this.save_address)
    },
    saveButton (y, x, address) { // 저장된 위경도 및 주소값을 Edit, Registrtion component로 보냄
      console.log(window.opener)
      window.opener.v.Mom.save(y, x, address) // window.opener에 V라는 객체가 이전 페이지인데 거기서 save method를 불러옴
      window.opener.v.Mom.onMapMove(y, x) // 마찬가지로 이전 페이지에서 위경도 값에 따라 지도 및 마커 이동
      window.close()
    }
  },
  watch: {
    // 만약 입력된 값이 빈칸이 아니고 한글, 영어일 경우 카카오 서버에서
    // 해당 지역 리스트를 받아온다
    filterList () {
      const str = this.searchdata
      const reg = /[^가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9|\s]/.test(str)
      if (reg === false && str !== '' && str !== '') {
        this.$axios.get('https://dapi.kakao.com/v2/local/search/keyword.json?query=' + this.searchdata)
          .then(response => {
            this.regionList = response.data.documents
            console.log(this.regionList)
          })
          .catch((ex) => {
            console.log(ex)
          })
        this.isActive = true
        return this.regionList
      } else {
        this.isActive = false
      }
    }
  }
}
</script>

<style scoped>
.s {
  padding: 10px 20px;
  width: 100%;
  max-width: 600px;
  height: 60px;
  box-sizing: border-box;
  box-shadow: 0 0 3px rgba(#000, 0.2);
  border: 1px solid #888;
  font-size: 16px;
}
.r {
  position: absolute;
  left: 0;
  top: 40px;
  width: 88%;
  height: 156px;
  overflow-y: auto;
}
.r >  li {
  margin-top: px;
  padding: 0 20px;
  width: 100%;
  height: 40px;
  background-color: #fff;
  box-sizing: border-box;
  border: 1px solid #888;
  outline: none;
  font-size: 16px;
  line-height: 15px;
  cursor: pointer;
}
.r > li:hover {
  background-color:aquamarine;
}
div#vue-naver-maps {
  width: 100%;
  height: 100%;
}
</style>
