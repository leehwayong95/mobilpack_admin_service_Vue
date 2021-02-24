<template>
  <div id="modal">
    <div class="closebtn" @click="$emit('close')">
        <img src="..\..\assets\images\btn_modalclose.png" width="20px">
      </div>
    <div class="modal_message">
      <span>
        미등록 아이디입니다.<br><br>확인 후 다시 입력해주세요.
      </span>
    </div>
    <div class="modal_button_wrap">
      <input class="btn btn-default col-md-3" @click="$emit('close')" type="button" value="확인">
    </div>
  </div>
</template>

<style scoped>
.modal_message {
  width: 100%;
  height: 100%;
  margin: 0;
  margin-bottom: 10px;
  margin-top: 20px;
  padding: 10px;
}
div.closebtn {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}
div.modal_button_wrap input{
  cursor: pointer;
  width: 100px;
  height: 30px;
}
</style>

<script>
export default {
  data () {
    return {
      del_password: ''
    }
  },
  props: [
    'hot_table'
  ],
  methods: {
    del_data () {
      this.$emit('close')
    }
  }
}
</script>
