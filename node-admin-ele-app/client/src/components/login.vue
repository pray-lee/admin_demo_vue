<template>
  <div class="login">
    <h1>管理系统-登录</h1>
    <section class="login-area">
      <el-form :model="loginUser" status-icon :rules="rules" ref="loginForm" label-width="100px" class="loginForm">
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="loginUser.email" autocomplete="off" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginUser.password" autocomplete="off" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
          <el-button type="primary" @click="resetForm('loginForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>
<script>
import { login } from '@/api/user/login'
import jwt_decode from 'jwt-decode'
export default {
  name: 'login',
  data () {
    return {
      loginUser: {
        email: '',
        password: ''
      },
      rules: {
        email: [
          { type: 'email', required: true, message: '请输入正确的邮箱地址',trigger: 'blur' }
        ],
        password: [
          { required: true, message:'请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.handleLogin(this.loginUser)
        }
      })
    },
    handleLogin (user) {
      login(user)
        .then(res => {
          const { token } = res.data
          // save token
          localStorage.setItem('eleToken', token)

          // parse token to vuex
          const user = jwt_decode(token)
          this.$store.dispatch('setAuth', !this.isEmpty(user))
          this.$store.dispatch('setUser', user)

          this.$message({
            message: '登录成功',
            type: 'success'
          })

          this.$router.push('/index')
        }, err => console.log(err))
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    isEmpty (obj) {
      return Object.keys(obj).length === 0 ? true : false
    }
  }
}
</script>
<style scoped lang="stylus">
  .login
    h1
      margin:100px auto
      text-align: center
      font-size: 40px
      color: #666
  .login-area
    width:50vw;
    margin:20px auto
</style>
