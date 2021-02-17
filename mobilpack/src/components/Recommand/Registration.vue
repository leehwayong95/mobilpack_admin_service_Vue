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
             <th>사진</th>
             <td class="Allbox" colspan="7" style="height:150px; padding-top: 10px;" >
               <input ref="imageInput" type="file" hidden @change="onChangeImages">
               <button v-if= "imagecheck >= 1" class="pickbox" type="button" @click="onClickImageUpload"><img class="pick"
               v-if="imageUrl" :src="imageUrl"
               ><button class="Deletepick">X</button></button>
               <button v-else class="pickbox" type="button" @click="onClickImageUpload"><img class="pick"
               v-if="imageUrl" :src="imageUrl"
               ></button>
               <button v-if= "imagecheck >= 2" class="pickbox" type="button" @click="onClickImageUpload"><img class="pick"
               v-if="imageUrl1" :src="imageUrl1"
               ><button class="Deletepick">X</button></button>
               <button v-else class="pickbox" type="button" @click="onClickImageUpload"><img class="pick"
               v-if="imageUrl1" :src="imageUrl1"
               ></button>
               <button v-if= "imagecheck >= 3" class="pickbox" type="button" @click="onClickImageUpload"><img class="pick"
               v-if="imageUrl2" :src="imageUrl2"
               ><button class="Deletepick">X</button></button>
               <button v-else class="pickbox" type="button" @click="onClickImageUpload"><img class="pick"
               v-if="imageUrl2" :src="imageUrl2"
               ></button>
               <button v-if= "imagecheck >= 4" class="pickbox" type="button" @click="onClickImageUpload"><img class="pick"
               v-if="imageUrl3" :src="imageUrl3"
               ><button class="Deletepick">X</button></button>
               <button v-else class="pickbox" type="button" @click="onClickImageUpload"><img class="pick"
               v-if="imageUrl3" :src="imageUrl3"
               ></button>
               <!--<input ref="imageInput" id="5" type="file" hidden @change="onChangeImages($event, 5)">-->
               <button v-if= "imagecheck >= 5" class="pickbox" type="button" @click="onClickImageUpload"><img class="pick"
               v-if="imageUrl4" :src="imageUrl4"
               ><button class="Deletepick">X</button></button>
                <button v-else class="pickbox" type="button" @click="onClickImageUpload"><img class="pick"
               v-if="imageUrl4" :src="imageUrl4"
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
             <th rowspan="2">위치 정보</th><!--칸 나누기는(세로)는 rowspan 사용 -->
             <td colspan="7" style="width:1340px; height:600px">
             </td>
             </tr>
             <tr>
             <td colspan="7">
                <input
                  style="width: 200px;"
                  type="text"
                  v-model="adress"
                  placeholder="위도"
                />
                 <input
                  style="width: 200px;"
                  type="text"
                  v-model="adress"
                  placeholder="경도"
                />
                <button class="centerbutton">지도확인</button>
                <button class="rightbutton">지도에서 직접 선택하기</button>
             </td>
             </tr>
             <tr>
             <th>주소</th>
             <td colspan="7">
                <input
                  placeholder="주소입력"
                  class="box"
                  type="text"
                  v-model="adress"
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
          <button class="centerbutton">저장</button>
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
      adress: '',
      phone: '',
      checkedValues: [],
      openhour: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14'],
      openmin: ['00', '10', '20', '30', '40', '50'],
      endhour: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'],
      endmin: ['00', '10', '20', '30', '40', '50'],
      Entrancehour: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'],
      Entrancemin: ['00', '10', '20', '30', '40', '50'],
      imageUrl: null,
      imageUrl1: null,
      imageUrl2: null,
      imageUrl3: null,
      imageUrl4: null,
      imagelist: [],
      imagecheck: 0
    }
  },
  methods: {
    onClickImageUpload () {
      this.$refs.imageInput.click()
    },
    onChangeImages (e) {
      const file = e.target.files[0]// 선택한 박스가 1~5무었인지만 알면된다.....//if.
      console.log('리스트길이 :' + this.imagelist.length)
      console.log(this.imagelist)
      if (this.imagelist.length === 0) {
        this.imageUrl = URL.createObjectURL(file)
        this.imagelist.push(this.imageUrl)
      } else if (this.imagelist.length === 1) {
        this.imageUrl1 = URL.createObjectURL(file)
        this.imagelist.push(this.imageUrl)
      } else if (this.imagelist.length === 2) {
        this.imageUrl2 = URL.createObjectURL(file)
        this.imagelist.push(this.imageUrl)
      } else if (this.imagelist.length === 3) {
        this.imageUrl3 = URL.createObjectURL(file)
        this.imagelist.push(this.imageUrl)
      } else if (this.imagelist.length === 4) {
        this.imageUrl4 = URL.createObjectURL(file)
        this.imagelist.push(this.imageUrl)
      }
      this.imagecheck = this.imagelist.length
      console.log('리스트길이2 :' + this.imagelist.length)
      console.log(this.imagelist)
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
  min-height: calc(190%);/* 탑,사이드 말고 흰창 크기 늘리기 위해 추가함 */
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
