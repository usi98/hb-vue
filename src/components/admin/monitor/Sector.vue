<template>
<!--饼图-->
  <div id="sector" style="width: 480px;height: 400px;"></div>

</template>

<script>
export default {
  name: "Sector",
  data(){
    return{
      v1: 10,
      v2: 20,
      v3: 30,
      v4: 40
    }
  },
  methods: {
    loadData(){
      let _this = this
      let myChart = this.$echarts.init(document.getElementById("sector"));//自己加的代码
      let option = { //加个let
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: '数据标识',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '40',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              {value: _this.v1, name: '正常运行'},
              {value: _this.v1, name: '跳闸'},
              {value: _this.v2, name: '欠费'},
              {value: _this.v3, name: '运行异常'},
            ]
          }
        ]
      }
      myChart.setOption(option);

    }
  },
  mounted() {
    this.loadData();
  },
}
</script>

<style scoped>

</style>