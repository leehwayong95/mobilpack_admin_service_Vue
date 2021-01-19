<template>
  <div id="content">
    <div class='cont_inner'>
      <h3>계정 정보</h3>
      <div class="acountinfo_wrap">
        <table>
          <tbody>
            <tr>
              <th>ID</th>
              <td>{{id}}</td>
            </tr>
            <tr>
              <th>PW</th>
              <td><button>뭘봐</button></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="userinfo_wrap">
        <h2>사용자 정보</h2>
        <table>
          <tbody>
            <tr>
              <th>이름</th>
              <td>{{name}}</td>
            </tr>
            <tr>
              <th>연락처</th>
              <td>{{phone}}</td>
            </tr>
            <tr>
              <th>이메일</th>
              <td>{{email}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
