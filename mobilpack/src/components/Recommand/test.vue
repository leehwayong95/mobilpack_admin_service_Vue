<template>
   <div class="wrap">
     <div id="app"
       v-on:keyup.down="selectValue('down')"
       v-on:keyup.up="selectValue('up')">
    <div class="search">
      <input class="s" placeholder="'장'을 써보세요"
             v-on:input="searchMethod">
      <ul class="r" tabindex="0"
          v-bind:class="{ show: isActive }"
          v-on:mouseover="removeValue">
        <li tabindex="-1" v-for="(el, index) in filterList" v-bind:key="index">
          <span>{{ el.name }}</span>
        </li>
      </ul>
      <p>Console: <strong>On</strong></p>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      names: [
        { name: '김장' },
        { name: '김건모 잘못된 만남' },
        { name: '홍길동' },
        { name: '손오공' },
        { name: '공민지' },
        { name: '장동건' },
        { name: '장희빈' },
        { name: '고추장' },
        { name: '된장' },
        { name: '장장' },
        { name: '희야' }
      ],
      isActive: false,
      searchQuery: ''
    }
  },
  methods: {
    searchMethod (e) {
      this.searchQuery = e.target.value
    }
  },
  watch: {
    filterList () {
      const str = this.searchQuery
      const reg = /[^가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9|\s]/.test(str)
      console.log(`typing value: ${str}`)
      if (reg === false && str !== '' && str !== ' ') {
        this.isActive = true
        return this.names.filter((el) => {
          return el.name.match(str)
        })
      } else {
        this.isActive = false
      }
    }
  }
}
</script>
