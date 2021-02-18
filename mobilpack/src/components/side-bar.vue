<template>
    <div class = 'v-sidebar-menu'>
        <ul id='menu'>
            <li class='logo' v-on:click="jump('admin')">T-Mas<br>Admin Service</li>
            <li>
              <span v-if="route == 'userList'" style="background: #3e61dc;" v-on:click="jump('userList')">회원 관리</span>
              <span v-else v-on:click="jump('userList')">회원 관리</span>
            </li>
            <li>
              <span v-if="route == 'recommnads'" style="background: #3e61dc;" v-on:click="jump('recommands')">추천 장소 관리</span>
              <span v-else v-on:click="jump('recommands')">추천 장소 관리</span>
            </li>
            <li>
              <span v-if="route == 'details' || route == 'Qna' || route =='Notice'" style="background: #3e61dc;">서비스관리</span>
              <span v-else>서비스관리</span>
                <ul v-if="route == 'details' || route == 'Qna' || route =='Notice'" style="display: block;">
                    <li>
                      <span v-if="route == 'details'" v-on:click="jump('details')" style="color: #3e61dc;">관리자 관리</span>
                      <span v-else v-on:click="jump('details')">관리자 관리</span>
                    </li>
                    <li>
                      <span v-if="route == 'Qna'" v-on:click="jump('Qna')" style="color: #3e61dc;">문의 관리</span>
                      <span v-else v-on:click="jump('Qna')">문의 관리</span>
                    </li>
                    <li>
                      <span v-if="route == 'Notice'" v-on:click="jump('Notice')" style="color: #3e61dc;">공지사항 관리</span>
                      <span v-else v-on:click="jump('Notice')">공지사항 관리</span>
                    </li>
                </ul>
                <ul v-else>
                    <li><span v-on:click="jump('details')">관리자 관리</span></li>
                    <li><span v-on:click="jump('Qna')">문의 관리</span></li>
                    <li><span v-on:click="jump('Notice')">공지사항 관리</span></li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
  data () {
    return {
      route: this.$route.name
    }
  },
  methods: {
    jump (s) {
      if (this.route !== s) {
        this.$router.push({name: s})
        this.route = this.$route.name
      }
    }
  }
}
</script>
