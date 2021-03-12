<template>
  <div id=content>
    <div class="title">
      <h1>추전 장소 상세</h1>
      <h3>HOME > 추천장소관리 > 추천장소상세</h3>
    </div>
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
            <td v-if="post.default_lang == 'KR'">한국어</td>
            <td v-else-if="post.default_lang == 'US'">영어</td>
            <td v-else-if="post.default_lang == 'JP'">일본어</td>
            <td v-else>중국어</td>
            <th>카테고리</th>
            <td>{{post.category}}</td>
          </tr>
          <tr>
            <th>추천 장소명</th>
            <td colspan="3">{{post.title}}</td>
          </tr>
          <tr>
            <th>관광정보</th>
            <td colspan="3" style="white-space:pre-line;">{{post.content}}</td>
          </tr>
          <tr>
            <th>태그</th>
            <td colspan="3">{{post.tag}}</td>
          </tr>
          <tr>
            <th>사진</th>
            <td colspan="3">
              <div class="img">
                <img v-for="i of img" :key="i" :src="i" alt="recommandFile">
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <h3 class="cont_title">| 음성 안내</h3>
      <table>
        <colgroup>
          <col style="width: 10%;">
        </colgroup>
        <tbody>
          <tr>
            <th>음성안내 문구</th>
            <td style="white-space:pre-line;">{{post.voice_info}}</td>
          </tr>
        </tbody>
      </table>
      <h3 class="cont_title">| 이용 정보</h3>
      <table>
        <colgroup>
          <col style="width: 10%;">><!--1행(제목부분) 너비 조절 -->
          <col style="width: 40%;"><!--2행(내용부분) 너비 조절 -->
          <col style="width: 10%;"><!--2행(내용부분) 너비 조절 -->
          <col style="width: 40%;"><!--3행(제목부분) 너비 조절 -->
        </colgroup>
      <tbody>
        <tr class="map">
          <th>위치 정보</th>
          <td colspan="3">
            <naver-maps
              :mapOptions="mapOptions"
              :initLayers="initLayers"
              @load="onLoad"
              style="margin: 0 auto">
              <naver-marker :lat="mapOptions.lat" :lng="mapOptions.lng" @load="onMarkerLoaded"/>  <!-- 네이버 지도에서 마커를 찍는다 -->
            </naver-maps>
          </td>
        </tr>
        <tr>
          <th>주소</th>
          <td>{{post.address}}</td>
        <th>연락처</th>
        <td>{{post.phone}}</td>
        </tr>
        <tr>
          <th>운영시간</th>
          <td>
            {{runningdate}} {{post.opentime}}~{{post.closetime}}
            <br/>
            <p v-if="pausedate">{{pausedate}} 휴무</p>
          </td>
          <th>입장마감 시간</th>
          <td>{{post.endtime}}</td>
        </tr>
        <tr>
          <th>등록자</th>
          <td v-if="post.name">{{post.name}}</td>
          <td v-else>삭제된 관리자</td>
          <th>등록 일시</th>
          <td>{{post.date}}</td>
        </tr>
        <tr>
          <th>서비스 상태</th>
          <td colspan="3" v-if="post.state == 1" style="color: blue;">
            서비스 중 <button @click="setStateToggle">서비스 중지</button>
          </td>
          <td colspan="3" v-else >
            서비스 중지 <button @click="setStateToggle">서비스 시작</button>
          </td>
        </tr>
      </tbody>
      </table>
      <div class="button_wrap">
        <button class="leftbutton" @click="gotoTranslate">번역 보기</button>
        <button class="delete" @click="setDelete">삭제</button>
        <button @click="gotoEdit">수정</button>
      </div>
        <h3 class="cont_title">| 리뷰</h3>
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
            <td style="text-align: center;">{{comments.length-index}}</td>
            <td>{{i.content}}</td>
            <td style="text-align: center;" v-if="i.name">{{i.name}}</td>
            <td style="text-align: center;" v-else>삭제된 회원</td>
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
  updated () {
    this.map.setCenter({lat: parseFloat(this.location[0]), lng: parseFloat(this.location[1])})
    this.marker.setPosition({lat: parseFloat(this.location[0]), lng: parseFloat(this.location[1])})
  },
  data () {
    return {
      post: '',
      comments: '',
      img: [],
      runningdate: '',
      pausedate: [],
      location: null,
      map: null, /* 지도를 사용하기 위해 map 객체를 생성 */
      marker: null, /* 마커를 조작하기 위해 marker 객체를 생성 */
      mapOptions: { /* 제주 시청을 기본값으로 설정함 */
        lat: 33.49959,
        lng: 126.53126,
        zoom: 16,
        zoomControl: false,
        mapTypeControl: false,
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
          /* 휴대폰 번호 정규식 */
          this.post.phone = this.post.phone.replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/, '$1-$2-$3')
          this.location = res.data.postModel.location.split(',')
          this.mapOptions.lat = parseFloat(this.location[0])
          this.mapOptions.lng = parseFloat(this.location[1])
          /* 휴무일, 운영일 요일 구하기 */
          let runningDateBit = parseInt(res.data.postModel.openday, 10).toString(2).split('')
          /* 2진수 7자리 비트 맞추기 */
          for (let index = runningDateBit.length; index < 7; index++) {
            runningDateBit.unshift('0')
          }
          this.pausedate = []
          for (let bit of runningDateBit) {
            this.pausedate.push((bit === '1' ? '0' : '1'))
          }
          this.pausedate = this.getRunningDate(this.pausedate).join('')
          this.runningdate = this.getRunningDate(runningDateBit).join('')
          /* 댓글, file List 부여 */
          this.comments = res.data.comment
          this.img = []
          for (var i of res.data.fileList) {
            this.img.push('http://localhost/img' + i.filepath.split('.\\upload')[1])
          }
        })
    },
    deleteComment (n) {
      if (confirm('선택한 리뷰를 삭제하시겠습니까?')) {
        this.$axios.post('http://localhost:9000/api/su/post/comment/delete?commentindex=' + n)
          .then((res) => {
            if (res.data === 'TRUE') {
              this.getPost()
            } else {
              alert('실패')
            }
          })
      }
    },
    gotoTranslate () {
      this.$router.push({
        name: 'translation',
        query: {
          postindex: this.$route.params.index,
          default: this.post.default_lang,
          title: this.post.title,
          content: this.post.content,
          tag: this.post.tag,
          voice: this.post.voice_info,
          address: this.post.address
        }
      })
    },
    getRunningDate (runningDateBit) {
      let result = []
      let countinueDay = false
      /* 연속된 요일인지 아닌지 추가 */
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
      /* 마지막 작업이 , 이면 제거하고 역순으로 리턴 */
      if (result[result.length - 1] === ', ') {
        result = result.splice(0, result.length - 1).reverse()
      } else {
        result = result.reverse()
      }
      /* 단일 요일일 경우 풀네임으로 적용 */
      if (result.length === 1) {
        result[result.length - 1] += '요일'
      } else {
        for (let i in result) {
          if ((result[parseInt(i) + 1] === ', ' && result[parseInt(i) - 1] !== '~') || (parseInt(i) === result.length - 1 && result[parseInt(i) - 1] === ', ')) {
            result[i] = result[i] + '요일'
          }
        }
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
    gotoEdit () {
      this.$router.push('/recommand/edit/' + this.$route.params.index)
    },
    setDelete () {
      if (confirm('선택한 추천 장소를 삭제하시겠습니까?')) {
        this.$axios.post('http://localhost:9000/api/su/post/delete?postindex=' + this.$route.params.index)
          .then((res) => {
            if (res.data === 'TRUE') {
              this.$router.push({name: 'recommands'})
            } else {
              alert('잠시후 시도해주세요')
            }
          })
      }
    },
    setStateToggle () {
      this.$axios.get('http://localhost:9000/api/su/post/place/enable?postindex=' + this.$route.params.index)
        .then((res) => {
          if (res.data === 'TRUE') {
            this.getPost()
          } else {
            alert('잠시 후 시도해주세요')
          }
        })
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
div#vue-naver-maps {
  height: 100%;
  width: 100%;
}
#content table tr.map {
  height: 400px;
}
#content table tr.map td {
  padding: 0;
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
div.img {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
}
div.img img {
  width: 30%;
}
</style>
