<template>
  <div>
    <!--    面包屑-->
    <el-card style="margin-bottom: 10px">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/admin/' }">管理中心</el-breadcrumb-item>
        <el-breadcrumb-item>通断电设置</el-breadcrumb-item>
        <el-breadcrumb-item>跳闸合闸操作</el-breadcrumb-item>
      </el-breadcrumb>
    </el-card>
    <h2>跳闸合闸操作</h2>
    <el-card>
      <el-button @click="AllClose" type="success" >全部通电</el-button>
      <el-button @click="AllTrip" type="danger" >全部断电</el-button>
    </el-card>
    <el-card>
      <h3>筛选：</h3>
      运行状态：<el-select v-model="value">
      <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
      </el-option>
    </el-select>
      楼号：<el-select v-model="value1" placeholder="请选择">
      <el-option
          v-for="item in options1"
          :key="item.value"
          :label="item.label"
          :value="item.value">
      </el-option>
    </el-select>
      <el-button type="primary" style="margin-left: 15px" v-on:click="updateCurrentChange()" >查询</el-button>
    </el-card>
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
          prop="meterAddress"
          label="表号"
          width="280">
      </el-table-column>

      <el-table-column
          label="运行状态"
          width="180">
          <template slot-scope="scope">
            <p v-bind:class="classObject(scope.row.enable)" style="text-align: center">
              {{scope.row.enable == 1? '正常运行':'已断电'}}
            </p>
          </template>
      </el-table-column>

      <el-table-column
          label="开关"
          width="">
        <template slot-scope="scope">
          <el-button @click="Close(scope.row.buildingId, scope.row.roomId)" v-bind:disabled="scope.row.enable ===1" type="primary" size="small">合闸</el-button>
          <el-button @click="Trip(scope.row.buildingId, scope.row.roomId)" v-bind:disabled="scope.row.enable ===0" type="danger" size="small">跳闸</el-button>
        </template>
      </el-table-column>

    </el-table>

    <div style="margin: 20px 0 50px 0">
      <el-pagination
          background
          style="float:right;"
          layout="total, prev, pager, next, jumper"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="pageSize"
          :total="total">
      </el-pagination>
    </div>
  </div>

</template>

<script>
export default {
  name: "Arrears",
  data() {
    return {
      loading: false,
      //分页信息
      tableData: [],
      pageSize: 10,
      currentPage: 1,
      total: 1,

      options: [{
        value: '2',
        label: '全部'
      }, {
        value: '1',
        label: '通电'
      }, {
        value: '0',
        label: '断电'
      }],
      options1: [{
        value: '0',
        label: '全部'
      }, {
        value: '1',
        label: '一号楼'
      }, {
        value: '2',
        label: '二号楼'
      }, {
        value: '3',
        label: '三号楼'
      }, {
        value: '4',
        label: '四号楼'
      }, {
        value: '5',
        label: '五号楼'
      }, {
        value: '6',
        label: '六号楼'
      }, {
        value: '7',
        label: '七号楼'
      }, {
        value: '8',
        label: '八号楼'
      }],
      value: '2',

      value1: '0'
    }
  },

  methods: {
    classObject: function (s) {
      if (s===1){
        return 'green'
      }else{
        return 'red'
      }
    },
    AllClose() {
      this.loading = true
      this.$axios.get('/AllClose').then((successResponse => {
        if(successResponse.data.code === 200){
          this.loadData()
          this.loading = false
        }}))
    },
    AllTrip() {
      this.loading = true
      this.$axios.get('/AllTrip').then((successResponse => {
        if(successResponse.data.code === 200){
          this.loadData()
          this.loading = false
        }}))
    },
    Close(bid, rid) {
      this.loading = true
      this.$axios.post('/Close', {
        buildingId: bid,
        roomId: rid
      }).then(successResponse => {
        if(successResponse.data.code === 200){
          this.updateCurrentChange()
        }
      })
      this.loading = false
    },
    Trip(bid, rid) {
      this.loading = true
      this.$axios.post('/Trip', {
        buildingId: bid,
        roomId: rid
      }).then(successResponse =>{
        if(successResponse.data.code === 200){
          this.updateCurrentChange()
        }
      })
      this.loading = false
    },
    handleCurrentChange(page){
      var _this = this
      this.currentPage = page
      this.$axios.get('/roomInfo/' + this.pageSize + '/' + page + '/' + this.value + '/' + this.value1).then(resp => {
        //value: 是否断电， value1: 楼号
        if (resp && resp.status === 200) {
          //console.info('data:{}',JSON.stringify(resp))
          _this.tableData = resp.data.result.content
          _this.total = resp.data.result.totalElements
        }
      })
    },
    updateCurrentChange(){
      let page = this.currentPage
      this.handleCurrentChange(page)
    },
    loadData(){
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
    this.loadData()
  }
}
</script>

<style scoped>

.green{
  color: green;
}
.red{
  color: red;
}
</style>