<template>

  <div>
<!--    面包屑-->
    <el-card style="margin-bottom: 10px">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/admin/' }">管理中心</el-breadcrumb-item>
        <el-breadcrumb-item>查询检索</el-breadcrumb-item>
        <el-breadcrumb-item>用户剩余电量查询</el-breadcrumb-item>
      </el-breadcrumb>

    </el-card>

    <el-form style="align-items: end">
      <h2>剩余电量查询</h2>
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
        height="750px"
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
          prop="price"
          label="电价(分/kW·h)"
          width="180">
      </el-table-column>
      <el-table-column
          prop="powerMax"
          label="最大功率(W)"
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
  </div>

</template>

<script>
export default {
  //剩余电量
  name: "Soc",
  data() {
    return {
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
      pageSize: 8,
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