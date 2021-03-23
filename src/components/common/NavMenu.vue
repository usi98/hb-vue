<template>
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
</template>

<script>
export default {
  name: 'NavMenu',
  data () {
    return {
      navList: [
        {name: '/index', navItem: '首页'},
        {name: '/jotter', navItem: '笔记本'},
        {name: '/library', navItem: '图书馆'},
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
