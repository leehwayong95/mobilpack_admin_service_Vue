<template>
  <div id=content>
    <div class="title">
      <h1>| 추전 장소 상세</h1>
      <h3>HOME > 서비스관리 > 추천장소관리 > 상세화면</h3>
    </div>
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
          <td colspan="3" v-if="post.default_lang == 'KR'">한국어</td>
          <td colspan="3" v-else-if="post.default_lang == 'EN'">영어</td>
          <td colspan="3" v-else-if="post.default_lang == 'JP'">일본어</td>
          <td colspan="3" v-else>중국어</td>
          <th>카테고리</th>
          <td colspan="3">{{post.category}}</td>
        </tr>
        <tr>
          <th>추천 장소명</th>
          <td colspan="7">{{post.title}}</td>
        </tr>
        <tr>
          <th>관광정보</th>
          <td colspan="7">{{post.content}}</td>
        </tr>
        <tr>
          <th>태그</th>
          <td colspan="7">{{post.tag}}</td>
        </tr>
        <tr>
          <th>사진</th>
          <td colspan="7">
            <img v-for="i of img" :key="i" :src="i" alt="recommandFile" style="width: 60%;">
          </td>
        </tr>
        </tbody>
      </table>
      <h3 class="cont_title">|음성 안내</h3>
      <table>
        <colgroup>
          <col style="width: 100px;">
        </colgroup>
        <tbody>
          <tr>
            <th>음성안내 문구</th>
            <td colspan="7">{{post.voice_info}}</td>
          </tr>
        </tbody>
      </table>
      <h3 class="cont_title">|이용 정보</h3>
      <table>
        <colgroup>
          <col style="width: 100px;">><!--1행(제목부분) 너비 조절 -->
          <col style="width: 100px;"><!--2행(내용부분) 너비 조절 -->
          <col style="width: 100px;"><!--2행(내용부분) 너비 조절 -->
          <col style="width: 100px;"><!--3행(제목부분) 너비 조절 -->
        </colgroup>
      <tbody>
        <tr>
          <th>위치 정보</th>
          <td colspan="7">
            <naver-maps
              :height="600"
              :width="800"
              :mapOptions="mapOptions"
              :initLayers="initLayers"
              @load="onLoad">
              <naver-marker :lat="mapOptions.lat" :lng="mapOptions.lng" @load="onMarkerLoaded"/>  <!-- 네이버 지도에서 마커를 찍는다 -->
            </naver-maps>
          </td>
        </tr>
        <tr>
          <th>주소</th>
          <td colspan="2">{{post.address}}</td>
        <th>연락처</th>
        <td colspan="4">{{post.phone}}</td>
        </tr>
        <tr>
          <th>운영시간</th>
          <td colspan="2">{{runningdate}} {{post.opentime}}</td>
          <th>입장마감 시간</th>
          <td colspan="4">{{post.endtime}}</td>
        </tr>
        <tr>
          <th>등록자</th>
          <td colspan="2">{{post.name}}</td>
          <th>등록 일시</th>
          <td colspan="4">{{post.date}}</td>
        </tr>
        <tr>
          <th>서비스 상태</th>
          <td colspan="7" v-if="post.state == 1" style="color: blue;">
            서비스 중 <button>서비스 중지</button>
          </td>
          <td v-else >
            서비스 중지 <button>서비스 시작</button>
          </td>
        </tr>
      </tbody>
      </table>
      <div class="button_wrap">
        <button class="leftbutton" @click="gotoTranslate">번역 보기</button>
        <button class="delete">삭제</button>
        <button>수정</button>
      </div>
        <h3 class="cont_title">|리뷰</h3>
      <table>
        <colgroup>
          <col width="5%">
          <col width="40%">
          <col width="10%">
          <col width="20%">
          <col width="10%">
        </colgroup>
        <tr>
          <th>No</th>
          <th>리뷰내용</th>
          <th>등록자</th>
          <th>등록 일시</th>
          <th>삭제</th>
        </tr>
        <tbody v-if="comments.length !==0">
          <tr v-for="(i,index) in comments" :key="i.commentindex">
            <td style="text-align: center;">{{index}}</td>
            <td>{{i.content}}</td>
            <td style="text-align: center;">{{i.name}}</td>
            <td style="text-align: center;">{{i.createat}}</td>
            <td style="text-align: center;"><button @click="deleteComment(i.commentindex)">삭제</button></td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
              <td colspan="5" style="text-align: center;">작성된 리뷰가 없습니다.</td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script>
export default {
  created () {
    this.getPost()
  },
  data () {
    return {
      post: '',
      comments: '',
      img: [],
      runningdate: '',
      map: null, /* 지도를 사용하기 위해 map 객체를 생성 */
      marker: null, /* 마커를 조작하기 위해 marker 객체를 생성 */
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
      initLayers: ['BACKGROUND', 'BACKGROUND_DETAIL', 'POI_KOREAN', 'TRANSIT', 'ENGLISH', 'CHINESE', 'JAPANESE']
    }
  },
  methods: {
    getPost () {
      this.$axios.get('http://localhost:9000/api/su/post/info', {
        params: {
          postindex: this.$route.params.index
        }
      })
        .then((res) => {
          this.post = res.data.postModel
          let location = res.data.postModel.location.split(',')
          this.map.setCenter({lat: parseFloat(location[0]), lng: parseFloat(location[1])})
          this.marker.setPosition({lat: parseFloat(location[0]), lng: parseFloat(location[1])})
          let runningDateBit = parseInt(res.data.postModel.openday, 10).toString(2).split('')
          this.runningdate = this.getRunningDate(runningDateBit).join('')
          this.comments = res.data.comment
          for (var i of res.data.fileList) {
            this.img.push('http://localhost/img' + i.filepath.split('.\\upload')[1])
          }
        })
    },
    deleteComment (n) {
      alert(n + '번 댓글')
    },
    gotoTranslate () {
      this.$router.push({
        name: 'translation',
        query: {data: {
          postindex: this.$route.params.index,
          default: this.post.default_lang,
          title: this.post.title,
          content: this.post.content,
          tag: this.post.tag,
          voice: this.post.voice_info,
          address: this.post.address
        }}
      })
    },
    getRunningDate (runningDateBit) {
      let result = []
      let countinueDay = false
      if (runningDateBit.length !== 7) {
        for (let i = runningDateBit.length; i < 7; i++) {
          runningDateBit.unshift('0')
        }
      }
      for (let index in runningDateBit) {
        if (countinueDay && runningDateBit[index] === '1') {
          if (result[result.length - 1] !== '~') {
            result.push('~')
          }
          if (index === (runningDateBit.length - 1).toString()) {
            result.push(this.getDay(index))
          }
        } else if (countinueDay && runningDateBit[index] === '0' && result[result.length - 1] === '~') {
          result.push(this.getDay(index - 1))
          countinueDay = false
        } else if (countinueDay && runningDateBit[index] === '0') {
          countinueDay = false
        } else if (!countinueDay && runningDateBit[index] === '1') {
          result.push(this.getDay(index))
          countinueDay = true
        }
        if (!countinueDay && result[result.length - 1] !== ', ' && result.length !== 0) {
          result.push(', ')
        }
      }
      if (result[result.length - 1] === ', ') {
        result = result.splice(0, result.length - 1).reverse()
      } else {
        result = result.reverse()
      }
      return result
    },
    getDay (index) {
      let result = {
        0: '일',
        1: '토',
        2: '금',
        3: '목',
        4: '수',
        5: '화',
        6: '월'
      }
      return result[parseInt(index)]
    },
    onMarkerLoaded (vue) { /** 마커를 이용하기 위해 마커 객체 생성 */
      this.marker = vue.marker
    },
    onLoad (vue) { /* 네이버 지도 api 사용을 위해 객체 생성 */
      this.map = vue
    }
  }
}
</script>

<style scoped>
#content table tr{
  cursor: initial;
}
#content table tr:hover {
  background: initial;
}
#content {
  overflow: auto;
}
.btn {
  height: 50px; /* 테이블과 버튼 간격 */
}
.leftbutton {
  position: absolute;
  left: 0px;
}
.scroll {
  overflow: scroll;
  background: #fff;
}
div.button_wrap {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}
div.button_wrap button {
  width: 100px;
  height: 30px;
  margin-right: 10px;
}
div.button_wrap button.delete {
  background: rgb(100, 100, 100);
}
</style>
