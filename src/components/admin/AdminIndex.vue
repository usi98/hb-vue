<template>

  <el-container class="is-vertical" >
    <el-header hidden>
      <Header></Header>
    </el-header>
    <el-container>
      <el-aside>
        <admin-menu></admin-menu>
      </el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
import AdminMenu from './AdminMenu'
import Header from './Header'

export default {
  name: 'AdminIndex',
  components: {AdminMenu, Header},
  data () {
    return {
      dialogVisible: false
    }
  },
  mounted () {
    // this.$router.replace('/admin/dashboard')
  }
}
</script>

<style scoped>

</style>
