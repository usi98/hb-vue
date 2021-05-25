<template>
<!--饼图-->
  <div>
    {{ups}} {{offs}}
    <div id="sector" style="width: 480px;height: 400px;"></div>
  </div>


</template>

<script>
export default {
  name: "Sector",
  data() {
    return{
      ups: 10,
      offs: 15,
    }
  },
  methods: {
    loadinfo() {
      var _this = this
      this.$axios.get('/circular').then(resp => {
        if (resp && resp.status === 200) {
          _this.ups = parseInt(resp.data.result.ups)
          _this.offs = parseInt(resp.data.result.offs)
          _this.loadData()
        }
      }).catch(failResonse => {
        _this.$message({
          message: '数据加载失败'+failResonse,
          type: 'error'
        });
      })

    },
    loadData(){
      var _this = this
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
              {value: _this.offs, name: '已断电'},
              {value: _this.ups, name: '已通电'}
            ]
          }
        ]
      }
      myChart.setOption(option);

    }
  },
  mounted() {
   // this.loadData();
    this.loadinfo()
  },
}
</script>

<style scoped>

</style>