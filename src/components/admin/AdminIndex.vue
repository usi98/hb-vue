<template>

  <el-container class="is-vertical" >
    <el-header>
      <Header></Header>
    </el-header>
    <el-container>
      <el-aside>
        <admin-menu></admin-menu>
      </el-aside>
      <el-main style="background: #F2F6FC" >
        <router-view/>
      </el-main>
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
      dialogVisible: false,
      isAdmin: this.$store.user
    }
  },
  mounted () {
    // this.$router.replace('/admin/dashboard')
  }
}
</script>

<style scoped>

</style>
