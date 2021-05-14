<template>
  <div>
    <!--    面包屑-->
    <el-card style="margin-bottom: 10px">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/admin/' }">管理中心</el-breadcrumb-item>
        <el-breadcrumb-item>查询检索</el-breadcrumb-item>
        <el-breadcrumb-item>违规记录</el-breadcrumb-item>
      </el-breadcrumb>
    </el-card>

    <h2>假期时间</h2>

<!--    <el-row>-->
<!--      楼号：-->
<!--      <el-select v-model="value" placeholder="请选择楼号">-->
<!--        <el-option-->
<!--            v-for="item in options"-->
<!--            :key="item.value"-->
<!--            :label="item.label"-->
<!--            :value="item.value">-->
<!--        </el-option>-->
<!--      </el-select>-->

<!--      <span class="demonstration">层号/房间号</span>-->
<!--      <el-cascader-->
<!--          v-model="value1"-->
<!--          :options="options1"-->
<!--          @change="handleChange"></el-cascader>-->
<!--    </el-row>-->
<!--    <br/>-->

    <div class="block" style="margin: 15px 0px">
      <span class="demonstration">设置通电日期</span>
      <el-date-picker
          v-model="value1"
          type="date"
          placeholder="选择日期">
      </el-date-picker>

      <el-button v-on:click="change()" style="margin-left: 60px" type="success">修改</el-button>

    </div>


    <div class="block" style="margin: 15px 0px">
      <span class="demonstration">设置断电日期</span>
      <el-date-picker
          v-model="value2"
          align="right"
          type="date"
          placeholder="选择日期"
          :picker-options="pickerOptions">
      </el-date-picker>

      <el-button v-on:click="change()" style="margin-left: 60px" type="success">修改</el-button>

    </div>



    <div class="block">
      <h3>
        <span class="demonstration">当前设置通电日期： </span>
        {{startdate}}

      </h3>
      <h3>
        <span class="demonstration">当前设置断电日期： </span>
        {{enddate}}
      </h3>
    </div>
<!--    <div class="block">-->

<!--      <span class="demonstration">放假起止时间设定： </span>-->
<!--      <el-date-picker-->
<!--          v-model="value3"-->
<!--          type="daterange"-->
<!--          range-separator="至"-->
<!--          start-placeholder="开始日期"-->
<!--          end-placeholder="结束日期">-->
<!--      </el-date-picker>-->
<!--      <el-button v-on:click="change()" style="margin-left: 60px" type="success">修改</el-button>-->
<!--    </div>-->
  </div>

</template>

<script>
export default {
  name: "Vacation",
  data() {
    return{
      options: [{
        value: '1',
        label: '1号楼'
      }, {
        value: '2',
        label: '2号楼'
      }, {
        value: '3',
        label: '3号楼'
      }, {
        value: '4',
        label: '4号楼'
      }, {
        value: '5',
        label: '5号楼'
      }, {
        value: '6',
        label: '6号楼'
      }],
      value: '',
      value1: '',

      options1: [],

      startdate: '',
      enddate: '',
      value3: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)]

    }
  },
  methods:{
    handleChange(value) {
      console.log(value);
    },
    change() {
      //更改放假起止时间
      var _this = this
      this.$axios
        .post('/changedate', {
          start: _this.$moment(_this.value3[0]). utcOffset( 480). format( 'YYYY-MM-DD'),
          end: _this.$moment(_this.value3[1]). utcOffset( 480). format( 'YYYY-MM-DD'),
        })
        .then(successResponse => {
          console.log("运行记录组件接到的数据"+successResponse.data);
        })
        .catch(failResponse => {
          console.error(failResponse)
        })
    },
    load() {
      var _this = this
      this.$axios.get('/vacation').then(resp => {
        if (resp && resp.status === 200) {
          //console.info('data:{}',JSON.stringify(resp))
          _this.startdate = resp.data.result.start
          _this.enddate = resp.data.result.end
        }
      })
    }
  },
  created() {
    var _this = this
    this.$axios.get('roomlist').then(resp=>{
      console.info(resp)
      _this.options1 = resp.data
    }).catch(fil=>{
      console.info(fil)
    })
  },
  mounted() {
    this.load()
  }
}
</script>

<style scoped>

</style>