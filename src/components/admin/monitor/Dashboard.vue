<template>
<div>
  {{address}}
{{t1}}
  {{t2}}
  <el-input v-model="t1"></el-input>
  <el-input v-model="t2"></el-input>
  <el-row :gutter="12">
    <el-col :span="12">
      <el-card shadow="hover">
        <DyData></DyData>
      </el-card>
    </el-col>
    <el-col :span="12">
      <el-card shadow="hover">
        <Chart :id="'chart'" v-bind:height="'300px'" v-bind:width="'300px'">  <div id="chart" ></div> </Chart>
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
      t1: 1,
      t2: 2
    }
  },
  computed: {
    address() {
      const {t1,t2} = this
      console.info('t1'+{t1,t2}.t1)
      console.info('t2'+{t1,t2}.t2)
      return {t1,t2}
    }
  },
  watch: {
    t1: {
      handler: function (newval, oldval){
        console.info('new'+newval)
        console.info('old'+oldval)
      }
    },
    address: {
      handler: function(newval, oldval){
        console.info('newt1'+newval)
        console.info('oldt2'+oldval)
      },
      deep: true
    }
  }

}
</script>

<style scoped>

</style>



