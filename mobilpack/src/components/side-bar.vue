<template>
    <div class = 'v-sidebar-menu'>
        <ul id='menu'>
            <li class='logo'>T-Mas<br>Admin Service</li>
            <li class='vsm--link vsm--link_level-2'><span>프로필 변경</span></li>
            <li class='vsm--link vsm--link_level-2'><span>회원 관리</span></li>
            <li class='vsm--link vsm--link_level-2'><span>추천 장소 관리</span></li>
            <li class='vsm--link vsm--link_level-2'>서비스관리
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
