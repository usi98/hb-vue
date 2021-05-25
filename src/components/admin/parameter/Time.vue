<template>
  <div>
    <el-card style="margin-bottom: 10px">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/admin/' }">管理中心</el-breadcrumb-item>
        <el-breadcrumb-item>参数设置</el-breadcrumb-item>
        <el-breadcrumb-item>功率设置</el-breadcrumb-item>
      </el-breadcrumb>
    </el-card>

    <el-form style="align-items: end">
      <h2>功率设置</h2>
      <el-button type="warning" style="margin: 15px 0" @click="setAllRoomTimeInfo" >设置全部宿舍供电起始时间</el-button>
    </el-form>

    <el-table
        :data="tableData"
        style="width: 100%">
      <el-table-column
          prop="id"
          label="ID"
          width="180">
      </el-table-column>
      <el-table-column
          prop="buildingId"
          label="公寓号"
          width="180">
      </el-table-column>
      <el-table-column
          prop="roomId"
          label="房间号">
      </el-table-column>

      <el-table-column
          prop="meterAddress"
          label="电表通讯地址">
      </el-table-column>
      <el-table-column
          prop="stime"
          label="供电开始时间">
      </el-table-column>
      <el-table-column
          prop="etime"
          label="供电结束时间">
      </el-table-column>

      <el-table-column
          label="操作"
          width="200">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">修改供电起始时间</el-button>
        </template>
      </el-table-column>
    </el-table>


    <div style="margin: 20px 0 50px 0">
      <el-pagination
          background
          style="float:right;"
          layout="total, prev, pager, next, jumper"
          @current-change="handleCurrentChange"
          :page-size="pageSize"
          :total="total">
      </el-pagination>
    </div>

    <el-dialog
        title="供电起始时间设置"
        :visible.sync="dialogVisible"
        width="30%">
      <span>开始时间：</span>

      <el-time-select
          v-model="startTime"
          :picker-options="{
            start: '05:30',
            step: '00:30',
            end: '18:30'
          }"
          placeholder="选择开始时间">
      </el-time-select>
      <br/>
      <span>结束时间：</span>
      <el-time-select
          v-model="endTime"
          :picker-options="{
            start: '18:30',
            step: '00:30',
            end: '24:00'
          }"
          placeholder="选择结束时间">
      </el-time-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="optionTime">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
export default {
  name: "Time",

  data() {
    return {

      opTimeBid: '',
      opTimeRid: '',
      startTime: '',
      endTime: '',
      //弹出框
      dialogVisible: false,
      //表格初始化信息
      tableData: [],
      pageSize: 8,
      total: 1,

      isDisabled: true,



    }
  },
  watch: {
    value: function(newVal) {
      // TO DO
      // console.log("newVal:", newVal);
      // console.log("oldVal:", oldVal);

      if (newVal!==''&&this.value1!==''){
        this.isDisabled=false
      }else {
        this.isDisabled=true
      }
    },
    value1: function(newVal) {
      // TO DO
      // console.log("newVal:", newVal);
      // console.log("oldVal:", oldVal);

      if (newVal!==''&&this.value!==''){

        this.isDisabled=false
      }else {
        this.isDisabled=true
      }
    }
  },
  methods: {
    handleChange(value) {

      console.log(value);
    },

    handleCurrentChange(page){
      var _this = this
      this.$axios.get('/powerInfo/' + this.pageSize + '/' + page).then(resp => {
        if (resp && resp.status === 200) {
          //console.info('data:{}',JSON.stringify(resp))
          _this.tableData = resp.data.result.content
          _this.total = resp.data.result.totalElements
        }
      })
    },
    //加载表格
    loadTable () {
      var _this = this
      this.$axios.get('/powerInfo/' + this.pageSize + '/1').then(resp => {
        if (resp && resp.status === 200) {
          //console.info('data:{}',JSON.stringify(resp))
          _this.tableData = resp.data.result.content
          _this.total = resp.data.result.totalElements
        }
      })
    },
    handleClick(scope) {
      this.dialogVisible = true
      this.opTimeBid = scope.buildingId
      this.opTimeRid = scope.roomId
      this.startTime = scope.stime
      this.endTime = scope.etime
    },
    setAllRoomTimeInfo() {
      this.dialogVisible = true
      this.opTimeBid = 0
      this.opTimeRid = 0
      this.startTime = ''
      this.endTime = ''
    },
    optionTime(){
      //更新房间供电起始时间
      var _this = this
      this.$axios
          .post('/updateRoomTime', {
            buildingId : _this.opTimeBid,
            roomId: _this.opTimeRid,
            stime: _this.startTime,
            etime: _this.endTime
          })
          .then(successResponse => {
            if (successResponse.data.code === 200) {
              _this.dialogVisible = false
              _this.$message.success('信息更改成功')
            }
          })
          .catch(failResponse => {
            _this.$message.success('信息更改失败'+failResponse)
          })
    }
  },

  mounted() {
    this.loadTable();
  }
}
</script>

<style scoped>

</style>