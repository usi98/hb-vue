<template>
  <div>
    <!--    面包屑-->
    <el-card style="margin-bottom: 10px">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/admin/' }">管理中心</el-breadcrumb-item>
        <el-breadcrumb-item>查询检索</el-breadcrumb-item>
        <el-breadcrumb-item>违规记录</el-breadcrumb-item>
      </el-breadcrumb>
    </el-card>

    <h2>Violation</h2>
  </div>

</template>

<script>
export default {
  name: "Violation"
}
</script>

<style scoped>

</style>