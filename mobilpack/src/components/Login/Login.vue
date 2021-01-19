<template>
    <div class = 'login' id='container'>
        <div class='loginBox'>
            <form>
                <table>
                    <tr><td><input type="text" class="login_txt" placeholder="ID"/></td></tr>
                    <tr><td><input type="password" class="login_txt" placeholder="PW"/></td></tr>
                </table>
            </form>
            <div class = 'btn_wrap'>
                <modals-container/>
                <button type="button" class="login_btn"  v-on:click="doc_del_rendar" style="height: 30px; width: 150px">로그인</button>
            </div>
        </div>
    </div>
</template>

<script>
import modal from '../alert/modal'
export default {
  methods: {
    routerpush () {
      this.$router.push('/main')
    },
    doc_del_rendar () {
      this.$modal.show(modal, {
        hot_table: 'data',
        modal: this.$modal
      },
      {
        name: 'dynamic-modal',
        width: '330px',
        height: '130px',
        draggable: true
      })
    }
  }
}
</script>

<style>
    @import url('../../assets/css/content');
.btn_wrap {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>
