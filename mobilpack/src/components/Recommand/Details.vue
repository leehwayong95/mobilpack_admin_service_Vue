<template>
    <div id=content>
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
             <td colspan="3">일반공지</td>
             <th>카테고리</th>
             <td colspan="3"></td>
             </tr>
             <tr>
             <th>추천 장소명</th>
             <td colspan="7"></td>
             </tr>
             <tr>
             <th>관광정보</th>
             <td colspan="7"></td>
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
        <col style="width: 100px;">
        </colgroup>
        <tbody>
             <tr>
             <th>음성안내 문구</th>
             <td colspan="7"></td>
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
             <td colspan="2"></td>
             <th>연락처</th>
             <td colspan="4"></td>
             </tr>
             <tr>
             <th>운영시간</th>
             <td colspan="2"></td>
             <th>입장마감 시간</th>
             <td colspan="4"></td>
             </tr>
             <tr>
             <th>등록자</th>
             <td colspan="2"></td>
             <th>등록 일시</th>
             <td colspan="4"></td>
             </tr>
             <tr>
             <th>서비스 상태</th>
             <td colspan="7"></td>
             </tr>
        </tbody>
        </table>
        <div>
          <button class="leftbutton">번역 보기</button>
          <button class="centerbutton">삭제</button>
          <button class="centerbutton">수정</button>
        </div>
         <h3 class="cont_title">|리뷰</h3>
        <table>
            <colgroup>
            <col width="10%">
            <col width="10%">
            <col width="40%">
            <col width="20%">
            <col width="15%">
            </colgroup>
        <thead>
         <tr>
            <th>No</th>
            <th>리뷰내용</th>
            <th>등록자</th>
            <th>등록 일시</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          <td>1</td>
          <td>2</td>
          <td>3</td>
          <td>4</td>
          <td>5</td>
        </tbody>
        </table>
    </section>
    </div>
</template>

<style scoped>
.btn {
  height: 50px; /* 테이블과 버튼 간격 */
}
.leftbutton {
  width: 100px;
  height: 30px;
}
.centerbutton {
  width: 100px;
  height: 30px;
}
.scroll {
  overflow: scroll;
  background: #fff;
}
</style>
