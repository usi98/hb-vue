<template>
<div>

  <el-card style="margin-bottom: 10px">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/admin/monitor/dashboard' }">管理中心</el-breadcrumb-item>
      <el-breadcrumb-item>工作状态监视</el-breadcrumb-item>
      <el-breadcrumb-item>工作表盘</el-breadcrumb-item>
    </el-breadcrumb>
  </el-card>

  楼号<el-input v-model="bid"></el-input>
  房间号<el-input v-model="rid"></el-input>
  <el-row :gutter="12">
    <el-col :span="16">
      <el-card shadow="hover">
        <DyData v-bind:building-id="Number(bid)"  v-bind:room-id="Number(rid)"></DyData>
      </el-card>
    </el-col>
    <el-col :span="8">
      <el-card shadow="hover">
        <Chart :id="'chart'" v-bind:height="'400px'" v-bind:width="'300px'" style="margin: 0 auto">  <div id="chart" ></div> </Chart>
      </el-card>
    </el-col>
  </el-row>

</div>
</template>

<script>
import DyData from "./DyData";
import Chart from "./Chart";
export default {
  name: "Dashboard",
  components: {DyData,Chart},
  data() {
    return{
      bid: 1,
      rid: 101
    }
  },
  // computed: {
  //   address() {
  //     const {t1,t2} = this
  //     console.info('t1'+{t1,t2}.t1)
  //     console.info('t2'+{t1,t2}.t2)
  //     return {t1,t2}
  //   }
  // },
  // watch: {
  //   t1: {
  //     handler: function (newval, oldval){
  //       console.info('new'+newval)
  //       console.info('old'+oldval)
  //     }
  //   },
  //   address: {
  //     handler: function(newval, oldval){
  //       console.info('newt1'+newval)
  //       console.info('oldt2'+oldval)
  //     },
  //     deep: true
  //   }
  // }
}
</script>

<style scoped>

</style>



