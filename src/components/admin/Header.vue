<template>

  <el-menu mode="horizontal">

    <span style="font-size: 32px;font-weight: bold;">白  卷</span>
    <i class="el-icon-switch-button" v-on:click="logout" style="float:right;font-size: 40px;color: #222;padding: 10px"></i>

  </el-menu>

</template>

<script>
import createRouter from '../../router'

export default {
  name: 'Header',
  methods: {
    logout () {
      var _this = this
      this.$axios.get('/logout').then(resp => {
        if (resp && resp.data.code === 200) {
          _this.$store.commit('logout')
          _this.$router.replace('/index')

          location.reload();
          // 清空路由，防止路由重复加载
          const newRouter = createRouter
          _this.$router.matcher = newRouter.matcher
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
