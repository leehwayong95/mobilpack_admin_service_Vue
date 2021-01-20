<template>
    <div class = 'v-sidebar-menu'>
        <ul id='menu'>
            <li class='logo' v-on:click="jump('main')">T-Mas<br>Admin Service</li>
            <li><span v-on:click="jump('myinfo')">프로필 변경</span></li>
            <li><span v-on:click="jump('user')">회원 관리</span></li>
            <li><span v-on:click="jump('recommands')">추천 장소 관리</span></li>
            <li><span>서비스관리</span>
                <ul>
                    <li><span v-on:click="jump('details')">관리자 관리</span></li>
                    <li><span v-on:click="jump('qna')">문의 관리</span></li>
                    <li><span v-on:click="jump('notice')">공지사항 관리</span></li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
  data () {
    return {
      fuck: null
    }
  },
  methods: {
    jump (s) {
      this.$router.push('/' + s)
    }
  }
}
</script>
