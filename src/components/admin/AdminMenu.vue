<template>

  <el-col :span="24">
    <el-menu  style="height: 1000px"
        :default-active="$route.path"
        router
        class=""
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">

      <el-submenu v-for="(item,i) in navList" :key="i" :index="item.name">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>{{item.navItem}}</span>
        </template>
        <el-menu-item v-for="(item,i) in item.childList" :key="i" :index="item.name">{{ item.navItem }}</el-menu-item>
      </el-submenu>

    </el-menu>
  </el-col>

</template>

<script>
export default {
  name: 'AdminMenu',
  data () {
    return {
      isCollapse: false,
      navList: [
        {name: '1', navItem: '工作状态监视',
          childList: [
            {name: '/admin/roleConfig', navItem: '状态展示'}
          ]
        },
        {name: '2', navItem: '个人中心',
          childList: [
            {name: '', navItem: '修改密码'}
          ]
        },
        {name: '3', navItem: '查询检索',
          childList: [
            {name: '/admin/surplus', navItem: '用户剩余电量'},
            {name: '', navItem: '用电状态'},
            {name: '', navItem: '用户操作记录查询'},
            {name: '', navItem: '用户断电记录查询'}
          ]
        },
        {name: '4', navItem: '参数设置',
          childList: [
            {name: '', navItem: '电价设置'},
            {name: '', navItem: '假期设置'},
            {name: '', navItem: '供电时段设置'}
          ]
        },
        {name: '5', navItem: '通断电控制',
          childList: [
            {name: '', navItem: '欠费自动断电'},
            {name: '', navItem: '超负载断电'}
          ]
        },
        {name: '6', navItem: '消息发布',
          childList: [
            {name: '', navItem: '发布公告'}
          ]
        }
      ]
    }
  },
  computed: {
    // adminMenus () {
    //   return this.$store.state.adminMenus
    // },
    // currentPath () {
    //   return this.$route.path
    // }
  }
}
</script>

<style scoped>

</style>
