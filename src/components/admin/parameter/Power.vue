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

      <el-row>
        <el-form-item>
          <el-button style="width: 150px;margin: 5px" type="primary" @click="changePower" v-bind:disabled="isDisabled">指定宿舍功率设置</el-button>
          <el-button style="margin-bottom: 15px" type="danger" @click="open">设置全部宿舍功率</el-button>
        </el-form-item>
      </el-row>
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
          prop="powerMax"
          label="最大功率（W）">
      </el-table-column>

      <el-table-column
          label="操作"
          width="100">
        <template slot-scope="scope">
<!--          <p>{{scope.row.id.toString()}}</p>-->
<!--          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>-->
          <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
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
  name: "Power",

  data() {
    return {
      //表格初始化信息
      tableData: [],
      pageSize: 8,
      total: 1,

      isDisabled: true,
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

      options1: [
        {
        value: '1',
        label: '1层',
        children: [{
          value: '101',
          label: '101'
        }, {
          value: '102',
          label: '102'
        }, {
          value: '103',
          label: '103'
        }, {
          value: '104',
          label: '104'
        },
        {
          value: '105',
          label: '105'
        }, {
          value: '106',
          label: '106'
        }, {
          value: '107',
          label: '107'
        }, {
          value: '108',
          label: '108'
        }, {
          value: '109',
          label: '109'
        }, {
          value: '110',
          label: '110'
        }]
      }, {
        value: '2',
        label: '2层',
        children: [{
          value: '201',
          label: '201'
        }, {
          value: '202',
          label: '202'
        }, {
          value: '203',
          label: '203'
        }, {
          value: '204',
          label: '204'
        }, {
          value: '205',
          label: '205'
        }, {
          value: '206',
          label: '206'
        }, {
          value: '207',
          label: '207'
        }, {
          value: '208',
          label: '208'
        }, {
          value: '209',
          label: '209'
        }, {
          value: '210',
          label: '210'
        }]
      }, {
        value: '3',
        label: '3层',
        children: [{
          value: '301',
          label: '301'
        }, {
          value: '302',
          label: '302'
        }, {
          value: '303',
          label: '303'
        }, {
          value: '304',
          label: '304'
        }, {
          value: '305',
          label: '305'
        }, {
          value: '306',
          label: '306'
        }, {
          value: '307',
          label: '307'
        }, {
          value: '308',
          label: '308'
        }, {
          value: '309',
          label: '309'
        }, {
          value: '310',
          label: '310'
        }]
      }, {
        value: '4',
        label: '4层',
        children: [{
          value: '401',
          label: '401'
        }, {
          value: '402',
          label: '402'
        }, {
          value: '403',
          label: '403'
        }, {
          value: '404',
          label: '404'
        }, {
          value: '405',
          label: '405'
        }, {
          value: '406',
          label: '406'
        }, {
          value: '407',
          label: '407'
        }, {
          value: '408',
          label: '408'
        }, {
          value: '409',
          label: '409'
        }, {
          value: '410',
          label: '410'
        }]
      }, {
        value: '5',
        label: '5层',
        children: [{
          value: '501',
          label: '501'
        }, {
          value: '502',
          label: '502'
        }, {
          value: '503',
          label: '503'
        }, {
          value: '504',
          label: '504'
        }, {
          value: '505',
          label: '505'
        }, {
          value: '506',
          label: '506'
        }, {
          value: '507',
          label: '507'
        }, {
          value: '508',
          label: '508'
        }, {
          value: '509',
          label: '509'
        }, {
          value: '510',
          label: '510'
        }]
      }, {
        value: '6',
        label: '6层',
        children: [{
          value: '601',
          label: '601'
        }, {
          value: '602',
          label: '602'
        }, {
          value: '603',
          label: '603'
        }, {
          value: '604',
          label: '604'
        }, {
          value: '605',
          label: '605'
        }, {
          value: '606',
          label: '606'
        }, {
          value: '607',
          label: '607'
        }, {
          value: '608',
          label: '608'
        }, {
          value: '609',
          label: '609'
        }, {
          value: '610',
          label: '610'
        }]
      }]
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
    open() {
      var _this = this
      this.$prompt('请输入最大限制功率（瓦）', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^[0-9]*$/,
        inputErrorMessage: '格式不正确'
      }).then(({ value }) => {
        this.$message({
          type: 'success',
          message: '设置全部宿舍最大功率为: ' + value + 'W'
        });
        _this.$axios
            .post('/updatePowerAll', {
              power : value,
            })
            .then(successResponse => {
              var num = successResponse.data
              console.log("更新全部宿舍功率为：", value, '数目为', num);

            })
            .catch(failResponse => {
              console.error(failResponse)
            })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });
      });
    },
    changePower() {
      var _this = this
      this.$prompt('请输入'+this.value+'-'+this.value1[1]+'宿舍最大限制功率（瓦）', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^[0-9]*$/,
        inputErrorMessage: '格式不正确'
      }).then(({ value }) => {
        this.$message({
          type: 'success',
          message: '设置此宿舍最大功率为: ' + value + 'W'
        });
        _this.$axios
            .post('/updatePower', {
              power : value,
              buildId: _this.value,
              roomId: this.value1[1]
            })
            .then(successResponse => {
              var num = successResponse.data
              console.log("更新全部宿舍功率为：", value, '数目为', num);

            })
            .catch(failResponse => {
              console.error(failResponse)
            })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });
      });
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
      var _this = this
      this.$prompt('请输入'+scope.buildingId+'-'+scope.roomId+'宿舍最大限制功率（瓦）', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^[0-9]*$/,
        inputErrorMessage: '格式不正确'
      }).then(({ value }) => {
        this.$message({
          type: 'success',
          message: '设置此宿舍最大功率为: ' + value + 'W'
        });
        _this.$axios
            .post('/updatePower', {
              power : value,
              buildId: scope.buildingId,
              roomId: scope.roomId
            })
            .then(successResponse => {
              var num = successResponse.data
              console.log("更新全部宿舍功率为：", value, '数目为', num);

            })
            .catch(failResponse => {
              console.error(failResponse)
            })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });
      });
    }
  },
  mounted() {
    this.loadTable();
  }
}
</script>

<style scoped>

</style>