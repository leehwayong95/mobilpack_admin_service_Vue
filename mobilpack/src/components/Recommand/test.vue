<template>
   <div class="wrap">
     <form method="post" action="/[업로드할_컨트롤러_주소]" enctype="multipart/form-data">
      <input multiple type="file" name="files">
     <button>submit</button>
</form>
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
