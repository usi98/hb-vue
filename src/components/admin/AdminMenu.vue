<template>

  <el-col :span="24">
    <el-menu  style="height: 1000px"
        default-active="CurentPath"
        class=""
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
        <el-menu-item index="/index">选项1</el-menu-item>


      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>
    </el-menu>
  </el-col>

</template>

<script>
export default {
  name: 'AdminMenu',
  data () {
    return {
      isCollapse: false
    }
  },
  computed: {
    adminMenus () {
      return this.$store.state.adminMenus
    },
    currentPath () {
      return this.$route.path
    }
  }
}
</script>

<style scoped>

</style>
