<template>
    <div id=content>
    <span class="title">
    <h1>HOME</h1>
    <h2>공지사항 > 공지 사항 상세</h2>
    </span>
    <section class="cont_inner">
        <table>
        <colgroup>
        <col style="width: 100px;"><!-- 공지노출구분 너비 조절 -->
        <col style="width: 100px;"><!-- 공지노출구분 내용 조절 -->
        <col style="width: 100px;"><!-- 등록일시 제목 조절 -->
        <col style="width: 200px;"><!-- 등록일시 내용 너비 조절 -->
        <col style="width: 100px;"><!-- 수정일시 너비 조절 -->
        <col style="width: 200px;"><!-- 수정일시 너비 조절 -->
        <col style="width: 10%;"><!-- 게시상태,조회수 제목 너비 조절 -->
        <col style="width: 10%;"><!-- 조회수 내용 너비 조절 -->
        </colgroup>
         <tbody>
             <tr>
             <th>공지노출 구분</th><!-- colspan 뒤에 붙는 숫자는 테이블의 항목수입니다 -->
             <td colspan="5"></td><!-- ex> colspan5는 5개가 (항목이)합쳐진 크기라고 보면됨  -->
             <th>게시상태</th>
             <td colspan="1"></td>
             </tr>
             <tr>
             <th>제목</th>
             <td colspan="7"></td>
             </tr>
             <tr>
             <th>작성자</th>
             <td colspan="1"></td>
             <th>등록일시</th>
             <td colspan="1"></td>
             <th>수정일시</th>
             <td colspan="1"></td>
             <th>조회수</th>
             <td colspan="1"></td>
             </tr>
             <tr>
             <th>내용</th>
             <td colspan="7"></td>
             </tr>
         </tbody>
        </table>
        <div>
          <th class="btn">
          </th>
          <button class="leftbutton" >목록</button>
          <button class="leftbutton" >게시중단</button>
          <button class="rightbutton" >수정</button>
          <button class="rightbutton">삭제</button>
        </div>
    </section>
    </div>
</template>
