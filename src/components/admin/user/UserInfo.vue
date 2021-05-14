<template>
<div>
  <!--    面包屑-->
  <el-card style="margin-bottom: 10px">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/admin/' }">管理中心</el-breadcrumb-item>
      <el-breadcrumb-item>个人信息</el-breadcrumb-item>
      <el-breadcrumb-item>账号信息</el-breadcrumb-item>
    </el-breadcrumb>

  </el-card>
  <h3>
    信息管理
  </h3>

  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <h3>基本信息</h3>

    </div>

    <el-button style="float: right; padding: 3px 0" type="text" @click="showDialog()">修改信息</el-button>
    <div>
      {{'名  字：   ' + name }}
    </div>
    <br/>
    <div>
      {{'学  号：   ' + sno }}
    </div>
    <br/>
    <div>
      {{'性    别：   ' + sex }}
    </div>
    <br/>
    <div>
      {{'出生年月：  ' + date }}
    </div>
    <br/>
    <div>
      {{'专    业：  ' + major }}
    </div>
    <br/>
    <div>
      {{'班    级：   ' + classes }}
    </div>
    <br/>
    <div>
      {{'电    话：   ' + phone }}
    </div>
    <br/>
    <div>
      {{'邮    箱：   ' + email }}
    </div>


    <el-dialog
        title="基本信息修改"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
      <el-row :gutter="24">
        <el-col :span="12">用户名</el-col>
        <el-col :span="12">学号</el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="12"><el-input v-model="info.name"></el-input></el-col>
        <el-col :span="12"><el-input v-model="info.sno" disabled></el-input></el-col>
      </el-row>

      <el-row :gutter="24">
        <el-col :span="12">性别</el-col>
        <el-col :span="12">出生日期</el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="12">
          <el-radio v-model="info.sex" label="男" border>男</el-radio>
          <el-radio v-model="info.sex" label="女" border>女</el-radio>
        </el-col>
        <el-col :span="12">
          <el-date-picker
            v-model="info.date"
            type="date"
            placeholder="选择日期">
        </el-date-picker></el-col>
      </el-row>

      <el-row :gutter="24">
        <el-col :span="12">专业</el-col>
        <el-col :span="12">班级</el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="12"><el-input v-model="info.major"></el-input></el-col>
        <el-col :span="12"><el-input v-model="info.classes"></el-input></el-col>
      </el-row>

      <el-row :gutter="24">
        <el-col :span="12">电话</el-col>
        <el-col :span="12">邮箱</el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="12"><el-input v-model="info.phone"></el-input></el-col>
        <el-col :span="12"><el-input v-model="info.email"></el-input></el-col>
      </el-row>


      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="save()">保  存</el-button>
      </span>
    </el-dialog>

  </el-card>
</div>


</template>

<script>
export default {
  name: "UserInfo",
  data (){
    return{
        dialogVisible: false,

        id: '',
        name: "姚林涛",
        sno: "171242",
        sex: "男",
        date: '1999-03-23',
        major: "计算机科学与技术",
        classes: "1707",
        phone: '111154787894',
        email: '784545613@163.com',
      info: {
        id: '',
        name: "姚林涛",
        sno: "171242",
        sex: "男",
        date: '1999-03-23',
        major: "计算机科学与技术",
        classes: "1707",
        phone: '111154787894',
        email: '784545613@163.com'
      }
    }
  },
  methods: {
    //关闭按钮
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(() => {
            done();
          })
          .catch(() => {});
    },
    showDialog() {
      var _this = this
      _this.info.name = _this.name
      _this.info.sno = _this.sno
      _this.info.sex = _this.sex
      _this.info.date = _this.date
      _this.info.major = _this.major
      _this.info.classes = _this.classes
      _this.info.phone = _this.phone
      _this.info.email = _this.email
      this.dialogVisible = true
    },
    search() {
      var _this = this
      this.$axios.post('/user/searchUserInfo',{
        username : _this.$store.state.user.username
      }).then(successResponse => {
        if (successResponse.data.code === 200) {
          let data = successResponse.data.result
          _this.info.id = data.id
          _this.id = data.id
          _this.name = data.name
          _this.sno = data.username
          _this.sex = data.sex
          _this.date = data.date
          _this.major = data.major
          _this.classes = data.classes
          _this.phone = data.phone
          _this.email = data.email
        }
      })
    },
    save() {
      var _this = this
      this.$axios.post('/user/saveUserInfo',{
        id: _this.info.id,
        name: _this.info.name,
        username: _this.info.sno,
        sex: _this.info.sex,
        date: _this.$moment(_this.info.date). utcOffset( 480). format( 'YYYY-MM-DD'),
        //Moment(date). utcOffset( 480). format( 'YYYY-MM-DD HH:mm:ss');
        major: _this.info.major,
        classes: _this.info.classes,
        phone: _this.info.phone,
        email: _this.info.email
      }).then(successResponse => {
        if (successResponse.data.code === 200) {
          _this.search()
        }
      })

      _this.dialogVisible = false
    }
  },
  mounted() {
    this.search()
  }
}
</script>

<style>

</style>