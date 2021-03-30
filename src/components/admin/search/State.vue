<template>
  <div>
    <!--    面包屑-->
    <el-card style="margin-bottom: 10px">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/admin/' }">管理中心</el-breadcrumb-item>
        <el-breadcrumb-item>查询检索</el-breadcrumb-item>
        <el-breadcrumb-item>用电状态</el-breadcrumb-item>
      </el-breadcrumb>
    </el-card>

{{str}}
  </div>
</template>

<script>
export default {
  name: "State",
  data () {
    return {
      timer: null,
      str: '2'
    }
  },
  methods: {
    setTimer() {
      if(this.timer == null) {
        this.timer = setInterval( () => {
          console.log('开始定时...每过一秒执行一次')
          this.str+=1
        }, 1000)
      }
    }
  },
  created() {
    // this.getFamilyBase_info()
    // 每次进入界面时，先清除之前的所有定时器，然后启动新的定时器
    console.info('开始')
    clearInterval(this.timer)
    this.timer = null
    this.setTimer()
  },
  destroyed() {
    // 每次离开当前界面时，清除定时器
    console.info('清除')
    clearInterval(this.timer)
    this.timer = null
  }
}
</script>
<style scoped>

</style>