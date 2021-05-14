<template>

  <el-menu mode="horizontal">

    <span style="margin: 10px;font-size: 32px;font-weight: bold;">后台管理</span>
    <i class="el-icon-switch-button" v-on:click="logout" style="float:right;font-size: 40px;color: #222;padding: 10px"></i>
  </el-menu>

</template>

<script>

export default {
  name: 'Header',
  methods: {
    logout () {
      var _this = this
      this.$axios.get('/logout').then(resp => {
        if (resp && resp.data.code === 200) {

          _this.$store.commit('logout')
          _this.$router.replace('/article')
          location.reload()
        }
      }).catch(failResponse => {
        console.error(failResponse)
      })
    }
  }
}
</script>

<style scoped>

</style>
