<template>
  <div>
    <!--    面包屑-->
    <el-card style="margin-bottom: 10px">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/admin/' }">管理中心</el-breadcrumb-item>
        <el-breadcrumb-item>电费管理</el-breadcrumb-item>
        <el-breadcrumb-item>剩余电量</el-breadcrumb-item>
      </el-breadcrumb>
    </el-card>
    <h3>
      剩余电量
    </h3>

    <el-table
        v-loading="loading"
        :data="tableData"
        border

        style="width: 100%">
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
          prop="surplus"
          label="剩余电量(kW·h)"
          width="180">
      </el-table-column>

      <el-table-column
          prop="powerMax"
          label="最大功率(W)"
          width="180">
      </el-table-column>
      <el-table-column
          prop="balance"
          label="余额"
          width="180">
      </el-table-column>
      <el-table-column
          align='center'
          label="学生信息">
        <template slot-scope="scope">
          <el-table
              :data="scope.row.users"
              class="table-in-table"
              :show-header="true"
              border
              row-key="id"
              style="width: 100%">
            <el-table-column
                prop="username"
                label="学号">
            </el-table-column>
            <el-table-column
                prop="name"
                label="姓名">
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
    </el-table>

    <el-button type="primary" v-on:click="open" style="margin: 15px">电费充值</el-button>


  </div>

</template>

<script>
export default {
  name: "Balance",
  data() {
    return{
      balance: 0,
      tableData: [],
      loading: false
    }
  },
  methods: {
    loadInfo(){
      let _this = this
      this.$axios.post('/user/searchRoomInfo',{
        username: _this.$store.state.user.username
      }).then(resp => {
        if (resp && resp.status === 200) {
          //console.info('data:{}',JSON.stringify(resp))
          _this.tableData = resp.data.result
        }
      })
    },
    recharge(balance){
      let _this = this
      this.$axios.post('/user/recharge',{
        username: _this.$store.state.user.username,
        buildingId: _this.tableData[0].buildingId,
        roomId: _this.tableData[0].roomId,
        balance: balance
      }).then(resp => {
        if (resp && resp.status === 200) {
          _this.loadInfo()
        }
      })
    },
    open() {
      let _this = this
      this.$prompt('请输入充值金额', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^[0-9]|.*$/,
        inputErrorMessage: '格式不正确'
      }).then(({ value }) => {

        _this.loading = true
        _this.recharge(value)
        setTimeout(()=>{   //设置延迟执行
          _this.loading = false
          this.$message({
            type: 'success',
            message: '充值金额为: ' + value
          });
        },1000);
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });
      });
    }

  },
  mounted() {
    this.loadInfo()
  }
}
</script>

<style scoped>

</style>