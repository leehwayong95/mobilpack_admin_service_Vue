<template>
  <div id="modal">
    <div class="closebtn" @click="$emit('close')">
      <img src="@/assets/images/btn_modalclose.png" width="20px">
    </div>
    <div class="modal_message">
      <span v-html="this.$props.hot_table"></span>
    </div>
    <div class="modal_button_wrap">
      <input class="btn btn-default col-md-3" @click="$emit('close')" type="button" value="확인">
    </div>
  </div>
</template>

<style scoped>
#modal {
  width: 100%;
  height: 100%;
  position: relative;
}
.modal_message {
  width: 100%;
  position: absolute;
  top: auto;
  margin: 0;
  margin-bottom: 10px;
  margin-top: 10px;
  padding: 0 20px;
}
.modal_button_wrap input {
  width: 100px;
  height: 30px;
  font-size: 14px;
  color: #fff;
  background: #3d4b64;
  border: solid 1px #ddd;
  border-radius: 5px;
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translate(-50%, 0);
}
div.closebtn {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}
div.modal_button_wrap{
  position: absolute;
  bottom: 10px;
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
