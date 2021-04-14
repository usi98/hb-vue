<template>
  <div id="container" style="width: 1000px;height: 400px;"></div>
</template>

<script>
export default {
  name: "DyData",
  data(){
    return{
      timer: null,
      v: 0
    }
  },
  props: {
    buildingId: {
      type: Number,

    },
    roomId: {
      type: Number,
      default: 101
    }
  },
  methods:{
    valuey() {
      this.$axios.get('/rand/'+this.buildingId+'/'+this.roomId).then(resp =>{
        this.v =  resp.data
      })
    },
    random_Data() { //把代码封装到一个方法里
      var _this = this
      function randomData() {
        now = new Date(+now + oneDay);

        _this.valuey()
        // value = value + Math.random() * 21 - 10;
        // value = _this.valuey()
        // console.info('value:'+value)
        temp = ([now.getFullYear(), now.getMonth() + 1, now.getDate()].join("/"))+''
        temp = ([now.getFullYear(), now.getMonth() + 1, now.getDate()].join("/"))+' '+([now.getHours(), now.getMinutes() + 1, now.getSeconds()].join(":"))+''


        return {
          name: temp,
          value: [
            // [now.getFullYear(), now.getMonth() + 1, now.getDate()].join("/"),
              temp,
            _this.v
          ]
        }
      }
      var temp = ''
      var data = [];
      // var now = +new Date(1997, 9, 3);
      var now = +new Date();
      var oneDay =   1000;
      // var value = Math.random() * 1000;
      for (var i = 0; i < 60; i++) {
        data.push(randomData());
      }
      let myChart = this.$echarts.init(document.getElementById("container"));//自己加的代码
      let option = { //加个let
        title: {
          text: "用电功率监控"
        },
        tooltip: {
          trigger: "axis",
          // formatter: function(params) {
          //   params = params[0];
          //   return (
          //       params.value[1]+''
          //   );
          // },
          axisPointer: {
            animation: false
          }
        },
        xAxis: {
          axisLabel: {
            interval:0,
            rotate:40,
            formatter: (value) => {
              var date1 = new Date(value)
              return [date1.getHours(),date1.getMinutes(),date1.getSeconds()].join(':')+''
            }
          },
          type: "time",
          show: true,
          splitLine: {
            show: true
          }
        },
        yAxis: {
          max: 1000,
          min: 0,
          type: "value",
          boundaryGap: [0, "100%"],
          splitLine: {
            show: true
          }
        },
        series: [
          {
            name: "模拟数据",
            type: "line",
            showSymbol: false,
            hoverAnimation: false,
            data: data,
            // 区域填充样式
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: 'rgba(58,132,255, 0.5)' // 0% 处的颜色
                }, {
                  offset: 1, color: 'rgba(58,132,255, 0)' // 100% 处的颜色
                }],
                global: false // 缺省为 false
              }
            }
          }
        ]
      }

      this.timer = setInterval(function() {
        data.shift();
        data.push(randomData());
        myChart.setOption(option);
      }, 1000);
    },

    setTimer() {
      if(this.timer == null) {
        this.timer = setInterval( () => {
          console.log('开始定时...每过一秒执行一次')
          this.str+=1
        }, 1000)
      }
    }

  },
  computed: {
    address() {
      const {buildingId,roomId} = this
      return {buildingId,roomId}
    }
  },
  watch: {
    address: {
      handler: function (/*newval, oldval*/) {
        console.info('重新开始')
        clearInterval(this.timer)
        this.timer = null
        this.v=0
        this.random_Data()
      },
      deep: true
    }
  },
  created() {

    // 每次进入界面时，先清除之前的所有定时器，然后启动新的定时器
    console.info('开始')
    clearInterval(this.timer)
    this.timer = null
  },
  mounted() {
    this.random_Data();
  },
  destroyed(){
    // 每次离开当前界面时，清除定时器
    console.info('清除')
    clearInterval(this.timer)
    this.timer = null
  }
}
</script>

<style scoped>

</style>



