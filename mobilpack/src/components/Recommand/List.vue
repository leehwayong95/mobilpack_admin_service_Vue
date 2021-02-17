<template>
  <div id="content">
    <div>
      <naver-maps
        :height="height"
        :width="width"
        :mapOptions="mapOptions"
        :initLayers="initLayers"
        @load="onLoad">
      </naver-maps>
    </div>
    <div>
      <input class="input-text" type="text" v-model="testOne" placeholder='위도'>
      <input class="input-text" type="text" v-model="testTwo" placeholder='경도'>
    </div>
    <button @click="mapinput">submit</button>
    <button @click="pop">지도 선택</button>
    <div>
      <naver-map
          :height="height"
          :width="width"
          :mapOptions="mapOptions"
          :initLayers="initLayers"
          @load="onLoad">
        </naver-map>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      width: 400,
      height: 400,
      info: false,
      marker: null,
      count: 1,
      map: null,
      isCTT: false,
      testOne: '',
      testTwo: '',
      setCenter: '',
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
  computed: {
    hello () {
      return `Hello, World! × ${this.count}`
    }
  },
  methods: {
    onLoad (vue) {
      this.map = vue
    },
    onWindowLoad (that) {
    },
    onMarkerClicked (event) {
      this.info = !this.info
    },
    onMarkerLoaded (vue) {
      this.marker = vue.marker
    },
    mapinput () {
      this.map.setCenter({lat: this.testOne, lng: this.testTwo})
    },
    pop () {
      window.open('/pop', '_blank')
    }
  },
  mounted () {
    setInterval(() => this.count++, 1000)
  }
}
</script>
<style scoped>
.info-window-container {
  padding: 10px;
  width: 300px;
  height: 100px;
  }
.input-text{
  width: 200px;
}
</style>
