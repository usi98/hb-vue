<template>
<div>
  <!--    面包屑-->
  <el-card style="margin-bottom: 10px">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/admin/' }">管理中心</el-breadcrumb-item>
      <el-breadcrumb-item>个人信息</el-breadcrumb-item>
      <el-breadcrumb-item>修改密码</el-breadcrumb-item>
    </el-breadcrumb>

  </el-card>
  <h3>
    修改密码
  </h3>
  <div >
    <el-card style="margin: 15px auto;width: 40%">

      <el-row :gutter="20" style="margin: 5px">
        <el-col :span="8">输入旧密码：</el-col>
        <el-col :span="16"><el-input v-model="oldpassword" show-password clearable></el-input></el-col>
      </el-row>
      <el-row :gutter="20" style="margin: 5px">
        <el-col :span="8">输入新密码：</el-col>
        <el-col :span="16"><el-input v-model="newpassword" show-password clearable></el-input></el-col>
      </el-row>
      <el-row :gutter="20" style="margin: 5px">
        <el-col :span="8">再次输入新密码：</el-col>
        <el-col :span="16"><el-input v-model="newpasswordtwo" show-password clearable></el-input></el-col>
      </el-row>

      <div style="text-align: center">
        <el-button type="primary" @click="updatesubmit" style="width: 300px">提交</el-button>
      </div>

    </el-card>
  </div>

</div>


</template>

<script>
export default {
  name: "UserInfo",
  data (){
    return{
      id: '',
      username: '0',
      oldpassword: '',
      newpassword: '',
      newpasswordtwo: ''
    }
  },
  methods: {
    open() {
      this.$alert('修改密码成功，请重新登录', '提示', {
        confirmButtonText: '确定',
        callback: () => {
          this.logout()
          this.$router.replace('/article')
        }
      });
    },
    load() {
      this.username = this.$store.state.user.username
    },
    logout () {
      var _this = this
      this.$axios.get('/logout').then(resp => {
        if (resp && resp.data.code === 200) {
          _this.$store.commit('logout')
          location.reload()
        }
      }).catch(failResponse => {
        console.error(failResponse)
      })
    },
    updatesubmit() {
      var _this = this
      this.$axios
          .post('/updatePassword', {
            username: _this.username,
            oldpassword: _this.oldpassword,
            newpassword: _this.newpassword,
            newpasswordtwo: _this.newpasswordtwo,
          })
          .then(successResponse => {
            console.info(successResponse.data)
            console.info(successResponse.data.code)
            console.info(successResponse.data.result)
            if (successResponse.data.code === 200){
              if (successResponse.data.result !== 'success'){
                _this.$message.error(successResponse.data.result)
              }else {
                _this.open()
              }
            }
          })
          .catch(failResponse => {
            console.error(failResponse)
          })
    }
  },
  mounted() {
    this.load()
  }
}
</script>

<style>

</style>