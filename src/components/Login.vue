<template>
  <body id="poster">
  <el-form class="login-container" label-position="left"
           label-width="0px">
    <h3 class="login_title">系统登录</h3>
    <p style="color: red">{{msg}}</p>
    <el-form-item>
      <el-input type="text" v-model="loginForm.username"
                auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item>
      <el-input type="password" v-model="loginForm.password"
                auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item>
      <el-radio v-model="radio" label="1">学生</el-radio>
      <el-radio v-model="radio" label="2">管理员</el-radio>
    </el-form-item>
    <el-form-item style="width: 100%">
      <el-button type="primary" style="width: 100%;background: #505458;border: none" v-on:click="login">登录</el-button>
    </el-form-item>
  </el-form>
  </body>

</template>


<script>

export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        username: 'admin',
        password: '123'
      },
      responseResult: [],
      msg: '',
      radio: '1'
    }
  },
  methods: {
    login () {
      var _this = this
      if(_this.radio === '1'){
        console.info('student')
      }else{
        console.info('admin')
      }

      this.$axios
          .post('/login', {
            username: this.loginForm.username,
            password: this.loginForm.password,
            isAdmin: false
          })
          .then(successResponse => {
            console.info(successResponse.data)
            if (successResponse.data.code === 200) {
              // var data = this.loginForm
              _this.$store.commit('login', _this.loginForm)
              var path = this.$route.query.redirect

              if(_this.radio === '1'){
                //如果选1就跳转到用户信息界面
                this.$router.replace({path: path === '/' || path === undefined ? '/index' : '/admin/user/userInfo'})
                //this.$router.replace({path: path === '/' || path === undefined ? '/index' : path})
              }else{
                //如果不选1就跳转到管理员信息监控界面
                this.$router.replace({path: path === '/' || path === undefined ? '/index' : '/admin/monitor/dashboard'})
                //this.$router.replace({path: path === '/' || path === undefined ? '/index' : path})
              }


            }else {
              this.msg='账号或密码错误'
            }
          })
          .catch(failResponse => {
            console.error(failResponse)
          })
    }
  }
}
</script>

<style>
#poster {
  background:url("../assets/bg.jpg") no-repeat;
  background-position: center;
  height: 105%;
  width: 100%;
  background-size: cover;
  position: fixed;
}
body{
  margin: 0px;
}
.login-container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 90px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.login_title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}

</style>
