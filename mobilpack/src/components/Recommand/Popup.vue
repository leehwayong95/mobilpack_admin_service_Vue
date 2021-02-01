<template>
    <div id="map" style="display:block;">
      <div id="mapbox" style="display:block;width:100%;height:100%;position:static;">
        <naver-maps
          :height="mapSize.height"
          :width="mapSize.width"
          :mapOptions="mapOptions"
          :initLayers="initLayers"
          @load="onLoad">
        </naver-maps>
      </div>
      <div id="searchbox" style="display:block;position:fixed;top:10px;left:20px;">
          <input v-model="searchdata" style="width:350px;height:40px;" placeholder="주소를 입력하세요">
          <button style="width:40px;height:40px;" @click="searchbutton">검색</button>
          <div v-show="isActive" style="top:50px;left:20px;width:400px;height:40px;">
            <ul class="r" tabindex="0">
              <li tabindex="-1" v-for="(item, index) in regionList"
              v-bind:key="index">
                <span>{{item.place_name}}</span>
              </li>
            </ul>
          </div>
      </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      isActive: false,
      regionList: [], /* 지역 이름으로 된 리스트  */
      searchdata: '',
      searchaddress: '',
      mapSize: {
        width: 600,
        height: 650
      },
      mapOptions: { /* 제주 시청을 기본값으로 설정함 */
        lat: 33.49959,
        lng: 126.53126,
        zoom: 16,
        zoomControl: true,
        zoomControlOptions: {position: 9, style: 2},
        mapTypeControl: true
      },
      initLayers: ['BACKGROUND', 'BACKGROUND_DETAIL', 'POI_KOREAN', 'TRANSIT', 'ENGLISH', 'CHINESE', 'JAPANESE']
    }
  },
  mounted () {
    this.$axios.defaults.headers.common['Authorization'] = 'KakaoAK 6bb3f20cedd0dea495fe5eeda9af7d9c'
    window.addEventListener('resize', this.handleResize)
  },
  methods: {
    onLoad (vue) {
      this.map = vue
      this.handleResize()
    },
    handleResize () {
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
          console.log(this.regionList)
          this.isActive = true
        })
        .catch((ex) => {
          console.log(ex)
        })
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
  margin-top: -1px;
  padding: 0 20px;
  width: 100%;
  height: 40px;
  background-color: #fff;
  box-sizing: border-box;
  border: 1px solid #888;
  outline: none;
  font-size: 16px;
  line-height: 40px;
  cursor: pointer;
}
</style>
