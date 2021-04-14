<template>
  <div style="width: 1300px;margin:0 auto">


    <el-tabs :tab-position="tabPosition" >
      <el-tab-pane label="用户管理">
        <div style="background-color: #cac6c6">
          <br>
          用户管理
          <br>
          用户管理
          <br>
          用户管理
          <br>
          用户管理
          <br>
          用户管理
          <br>
          用户管理          <br>
          用户管理          <br>
          用户管理          <br>
          用户管理          <br>
          用户管理          <br>
          用户管理          <br>
          用户管理          <br>
          用户管理
          <br>
          用户管理 <br>
          用户管理 <br>
          用户管理
          <br><br>
          <br><br><br><br>
        </div>

      </el-tab-pane>
      <el-tab-pane label="配置管理">配置管理</el-tab-pane>
      <el-tab-pane label="角色管理">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
    </el-tabs>
<!--    <side-menu id="side-menu"></side-menu>-->

  </div>
</template>

<script>

// import SideMenu from './SideMenu'
export default {
  name: 'AppIndex',
  // components: { SideMenu
  data() {
    return{
      tabPosition: 'left'
    }
  }
}
</script>

<style scoped>
.home {
  width: 990px;
  margin-left: auto;
  margin-right: auto;
  margin-top: -20px;
}

#header-div {
  padding-bottom: 20px;
  padding-left: 5px;
  background-color: white;
}

#side-menu {
  position: fixed;
  margin-left: 50%;
  left: -680px;
  top: 100px;
}
</style>
