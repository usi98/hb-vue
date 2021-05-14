<template>
  <div>
    <!--    面包屑-->
    <el-card style="margin-bottom: 10px">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/admin/' }">管理中心</el-breadcrumb-item>
        <el-breadcrumb-item>信息统计</el-breadcrumb-item>
        <el-breadcrumb-item>缴费记录</el-breadcrumb-item>
      </el-breadcrumb>
    </el-card>
    <h3>
      缴费记录
    </h3>

    <el-table
        :data="tableData"
        style="width: 100%">
      <el-table-column
          prop="date"
          sortable
          label="日期"
          width="180">
      </el-table-column>
      <el-table-column
          prop="username"
          sortable
          label="用户名"
          width="180">
      </el-table-column>

      <el-table-column
          prop="buildingId"
          label="楼号"
          width="180">
      </el-table-column>
      <el-table-column
          prop="roomId"
          label="房间号"
          width="180">
      </el-table-column>
      <el-table-column
          prop="money"
          label="金额">
      </el-table-column>
      <el-table-column
          prop="description"
          label="描述">
      </el-table-column>
    </el-table>

    <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="total">
    </el-pagination>

  </div>
</template>

<script>
export default {
  name: "Payrecord",
  data() {
    return {
      tableData: [],
      currentPage: 1,
      total: 15,
      pageSize: 12
    }
  },
  methods:{
    handleCurrentChange(page){
      var _this = this
      this.$axios.get('/user/loadRechargeInfo/' + this.pageSize + '/' + page).then(resp => {
        if (resp && resp.status === 200) {
          //console.info('data:{}',JSON.stringify(resp))
          _this.tableData = resp.data.result.content
          _this.total = resp.data.result.totalElements
        }
      })
    }
  },
  mounted() {
    this.handleCurrentChange(1)
  }
}
</script>

<style scoped>

</style>