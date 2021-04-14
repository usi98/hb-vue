<template>
  <div style="width: 1300px;margin:0 auto">

    <el-menu
        :default-active="$route.path"
        router
        mode="horizontal"
        background-color="white"
        text-color="#222"
        active-text-color="red"
        style="min-width: 1300px">
      <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">
        {{ item.navItem }}
      </el-menu-item>
    </el-menu>

<!--
    <el-container>
      <el-menu
          :default-active="$route.path"
          router
          mode="horizontal"
          background-color="#6BB2FB"
          text-color="#222"
          active-text-color="red"
          style="width: 1200px">
        <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">
          {{ item.navItem }}
        </el-menu-item>
      </el-menu>
    </el-container>


    <el-menu
        :default-active="activeIndex2"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
      <el-menu-item index="1">处理中心</el-menu-item>
      <el-submenu index="2">
        <template slot="title">我的工作台</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
        <el-submenu index="2-4">
          <template slot="title">选项4</template>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="3" disabled>消息中心</el-menu-item>
      <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
    </el-menu>-->


  </div>

</template>

<script>
export default {
  name: 'NavMenu',
  data () {
    return {
      navList: [
        {name: '/index', navItem: '首页'},
        {name: '/article', navItem: '公告'},
        {name: '/admin', navItem: '个人中心'}
      ]
    }
  },
  methods: {
    // logout () {
    //   var _this = this
    //   this.$axios.get('/logout').then(resp => {
    //     if (resp.data.code === 200) {
    //       // 前后端状态保持一致
    //       console.info('logout:'+resp.data.code)
    //       //清除重置vue实例上所有变量，包括清除路由，防止动态获取路由时重复添加
    //       location.reload();
    //       _this.$store.commit('logout')
    //       _this.$router.replace('/login')
    //     }
    //   })
    // }
  }
}
</script>

<style scoped>
a{
  text-decoration: none;
}
span {
  pointer-events: none;
}
.el-icon-switch-button {
  cursor: pointer;
  outline:0;
}
</style>
