<template>
  <div id=content>
    <h1>AdminManagement</h1>
    <div>
        <table>
          <tr>
            <th>id</th>
            <th>이름</th>
            <th>연락처</th>
            <th>이메일</th>
            <th>등록일시</th>
            <th>수정일시</th>
          </tr>
          <tr v-for="p in items" :key="p.no">
                <td>{{ p.admin_id }}</td>
                <td>{{ p.name }}</td>
                <td>{{ p.phone }}</td>
                <td>{{ p.email }}</td>
                <td>{{ p.createat }}</td>
                <td>{{ p.updateat }}</td>
            </tr>
          </table>
      </div>
  </div>
</template>

<script>
export default {
  mounted () {
    this.$axios.get('http://localhost:9000//api/su/admin/adminlist', {params: { Currentpage: 0, Number: 20 }})
      .then((res) => {
        this.items = res.data
      })
      .catch((err) => {
        console.log(err)
      })
  },
  data () {
    return {
      Currentpage: '',
      Number: '',
      items: []
    }
  }
}
</script>
