<template>
    <el-container >
      <el-header>
        <NavMenu></NavMenu>
      </el-header>
      <el-main>
        <router-view/>
      </el-main>
      <el-footer style="background-color: #cac6c6">
        Footer</el-footer>
    </el-container>
</template>

<script>
import NavMenu from "@/components/common/NavMenu";
export default {
  name: "Home",
  components: {NavMenu}
}
</script>

<style scoped>

</style>
