<template>
  <div :id="id" :style="style">

  </div>
</template>

<script>
export default {
  name: "Chart",
  data() {
    return {
      //echarts实例
      chart: ""
    };
  },
  props: {
    //父组件需要传递的参数：id，width，height，option
    id: {
      type: String
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "300px"
    },
    option: {
      type: Object,
      //Object类型的prop值一定要用函数return出来，不然会报错。原理和data是一样的，
      //使用闭包保证一个vue实例拥有自己的一份props
      default() {
        return {
          title: {
            text: '连续半年月用电量统计表（单位:度）',
            subtext: 'From System',
            sublink: 'http://e.weibo.com/1341556070/AjQH99che'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: ['2020/10', '2020/11', '2020/12', '2021/1', '2021/2', '2021/3', '2021/4'],
              axisTick: {
                alignWithLabel: true
              }
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: '用电量',
              type: 'bar',
              barWidth: '60%',
              data: [18.7, 20.5, 19.2, 17.4, 18.8, 16.9, 17.2]
            }
          ]
        };
      }
    }
  },
  computed: {
    style() {
      return {
        height: this.height,
        width: this.width
      };
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.chart = this.$echarts.init(document.getElementById(this.id));
      this.chart.setOption(this.option);
    }
  }
}
</script>

<style scoped>

</style>