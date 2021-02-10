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
                <select style="width:200px">
                <option >한국어</option>
                <option >영어</option>
                <option >일본어</option>
                <option >중국어</option>
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
                <td class="scroll" style="height:100px" colspan="7">
                <textarea
                style="width:1350px; height:100px"
                class="box"
                type="text"
                v-model="content"
                />
             </td>
             </tr>
             <tr>
             <th>태그</th>
             <td colspan="7"></td>
             </tr>
             <tr>
             <th>사진</th>
             <td colspan="7"></td>
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
                <td class="scroll" style="height:100px" colspan="7">
                <textarea
                style="width:1350px; height:100px"
                class="box"
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
        <col style="width: 100px;">><!--1행(제목부분) 너비 조절 -->
        <col style="width: 100px;"><!--2행(내용부분) 너비 조절 -->
        <col style="width: 100px;"><!--2행(내용부분) 너비 조절 -->
        <col style="width: 100px;"><!--3행(제목부분) 너비 조절 -->
        </colgroup>
        <tbody>
             <tr>
             <th>위치 정보</th>
             <td colspan="7"></td>
             </tr>
             <tr>
             <th>주소</th>
             <td colspan="7">
                <input
                  style="width:100px height: 20px"
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
                  style="width:100px height: 20px"
                  class="box"
                  type="text"
                  v-model="phone"
                />
             </td>
             </tr>
             <tr>
             <th>운영시간</th>
             <td colspan="7"></td>
             </tr>
             <tr>
             <th>입장마감 시간</th>
             <td colspan="7"></td>
             </tr>
        </tbody>
        </table>
        <div>
          <button class="centerbutton">취소</button>
          <button class="centerbutton">저장</button>
        </div>
    </section>
    </div>
</template>

<script>
export default {
  data () {
    return {
      select: '선택',
      position: '',
      content: '',
      voice: '',
      adress: '',
      phone: ''
    }
  }
}
</script>

<style scoped>
.scroll {
  overflow: scroll;
  background: #fff;
}
.centerbutton {
  width: 100px;
  height: 30px;
}
.cont_inner {
  height: 150%;
}
</style>
