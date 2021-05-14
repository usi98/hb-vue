<template>
  <div>
    <!--    面包屑-->
    <el-card style="margin-bottom: 10px">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/admin/' }">管理中心</el-breadcrumb-item>
        <el-breadcrumb-item>查询检索</el-breadcrumb-item>
        <el-breadcrumb-item>操作记录</el-breadcrumb-item>
      </el-breadcrumb>
    </el-card>

    <h2>操作记录</h2>

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

    <el-table
        :data="tableData"
        style="width: 100%">
      <el-table-column
          label="日期"
          width="240">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column
          label="用户名"
          width="180">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.username }}</el-tag>
          </div>
<!--          <el-popover trigger="hover" placement="top">-->
<!--            <p>姓名: {{ scope.row.username }}</p>-->
<!--            <p>住址: {{ scope.row.address }}</p>-->
<!--            <div slot="reference" class="name-wrapper">-->
<!--              <el-tag size="medium">{{ scope.row.username }}</el-tag>-->
<!--            </div>-->
<!--          </el-popover>-->
        </template>
      </el-table-column>
      <el-table-column label="操作描述">
        <template slot-scope="scope">
          {{scope.row.description}}
        </template>
      </el-table-column>
    </el-table>

    <div style="margin: 20px 0 50px 0">
      <el-pagination
          background
          style="float:left;"
          layout="total, prev, pager, next, jumper"
          @current-change="handleCurrentChange"
          :page-size="pageSize"
          :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "Operation",
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

      pageSize: 15,
      tableData: [],
      total: 0
    }
  },
  methods:{
    handleChange(value) {
      console.log(value);
    },
    loadInfo(){
      var _this = this
      this.$axios.get('/loadOperateLog/' + this.pageSize + '/1').then(resp => {
        if (resp && resp.status === 200) {
          //console.info('data:{}',JSON.stringify(resp))
          _this.tableData = resp.data.result.content
          _this.total = resp.data.result.totalElements
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
  mounted(){
    this.loadInfo();
  }
}
</script>

<style scoped>

</style>