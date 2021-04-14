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

    <h2>违规记录</h2>

    <el-row>
      楼号：
      <el-select v-model="value" placeholder="请选择楼号">
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select>

      <span class="demonstration">层号/房间号</span>
      <el-cascader
          v-model="value1"
          :options="options1"
          @change="handleChange"></el-cascader>
    </el-row>

  </div>

</template>

<script>
export default {
  name: "Price",
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

    }
  },
  methods:{
    handleChange(value) {
      console.log(value);
    },
  },
  created() {
    var _this = this
    this.$axios.get('roomlist').then(resp=>{
      console.info(resp)
      _this.options1 = resp.data
    }).catch(fil=>{
      console.info(fil)
    })
  }
}
</script>

<style scoped>

</style>