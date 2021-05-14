<template>
  <div>
<!--    面包屑-->
    <el-card style="margin-bottom: 10px">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/admin/' }">管理中心</el-breadcrumb-item>
        <el-breadcrumb-item>查询检索</el-breadcrumb-item>
        <el-breadcrumb-item>房间信息</el-breadcrumb-item>
      </el-breadcrumb>
    </el-card>

    <el-form style="align-items: end">
      <h2>房间信息</h2>
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
        宿舍号：
          <el-input style="width: 120px" v-model="room"></el-input>
      </el-row>

      <el-row>
        <el-form-item>
          <el-button style="width: 150px;margin: 5px" type="primary" @click="search()">查询</el-button>
        </el-form-item>
      </el-row>
    </el-form>

<!--查询返回内容-->

    <el-table
        :data="tableData"
        border
        height="580px"
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
            <el-table-column
                label="操作">
              <template slot-scope="scope">
                <el-button @click="edit(scope.row)" type="primary" size="small">修改</el-button>
                <el-button @click="del(scope.row.id)" type="danger" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
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


<!--信息编辑弹出对话框-->
    <el-dialog
        title="信息修改"
        :visible.sync="dialogVisible"
        :before-close="handleClose"
        width="30%">


      <el-row>
        <el-col :span="3">
          楼号
        </el-col>
        <el-col :span="9">
          <el-input style="width: 120px" v-model="info.bid"></el-input>
        </el-col>
        <el-col :span="3">
          宿舍号
        </el-col>
        <el-col :span="9">
          <el-input style="width: 120px" v-model="info.rid"></el-input><br/>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="3">
          学号
        </el-col>
        <el-col :span="9">
          <el-input style="width: 120px" v-model="info.username"></el-input>
        </el-col>
        <el-col :span="3">
          名字
        </el-col>
        <el-col :span="9">
          <el-input style="width: 120px" v-model="info.name"></el-input>
        </el-col>
      </el-row>

      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>
  </div>

</template>

<script>
export default {
  //剩余电量
  name: "Soc",
  data() {
    return {
      info: {
        id: 0,
        bid: 0,
        rid: 0,
        username: '',
        name: '',
      },
      dialogVisible: false,

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
      room: '',

//分页信息
      tableData: [],
      pageSize: 4,
      total: 1,
    }
  },
  methods: {
    search () {
      var _this = this
      this.$axios
          .post('/surplus', {
            buildingId : _this.value,
            roomId: _this.room
          })
          .then(successResponse => {
            _this.tableData=successResponse.data
            _this.users=_this.tableData[0].users
            // let resdata=JSON.parse(JSON.stringify(successResponse.data));
            console.log("运行记录组件接到的数据",_this.tableData[0].users);

          })
          .catch(failResponse => {
            alert("输入正确宿舍号！")
            console.error(failResponse)
          })
    },
    handleClose(done) {
      this.$confirm('是否要放弃修改？')
          .then(() => {
            done();
          })
          .catch(() => {});
    },
    edit(row) {
      let _this = this
      _this.info.id = row.id
      _this.info.bid = row.buildingId
      _this.info.rid = row.roomId
      _this.info.username = row.username
      _this.info.name = row.name
      this.dialogVisible = true

    },
    editSubmit() {


    },
    del(id) {
      this.$confirm('此操作将永久删除，是否继续？','提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(()=>{
        //todo 后台删除
        this.$message({
          type: 'success',
          message: '删除成功'+id
        })
      }).catch(()=>{
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    handleCurrentChange(page){
      var _this = this
      this.$axios.get('/roomInfo/' + this.pageSize + '/' + page).then(resp => {
        if (resp && resp.status === 200) {
          //console.info('data:{}',JSON.stringify(resp))
          _this.tableData = resp.data.result.content
          _this.total = resp.data.result.totalElements
        }
      })
    },
    loadInfo(){
      var _this = this
      this.$axios.get('/roomInfo/' + this.pageSize + '/1').then(resp => {
        if (resp && resp.status === 200) {
          //console.info('data:{}',JSON.stringify(resp))
          _this.tableData = resp.data.result.content
          _this.total = resp.data.result.totalElements
        }
      })
    }
  },
  mounted() {
    this.loadInfo()
  }
}
</script>

<style scoped>

</style>