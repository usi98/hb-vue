<template>
    <el-container >
      <el-header>
        <NavMenu></NavMenu>
      </el-header>
      <el-main style="background-color: #F2F6FC">
        <router-view/>
      </el-main>

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
