<template>
  <div class="register">
    <h1>管理系统-注册</h1>
    <section class="form-area">
      <el-form :model="registerUser" status-icon :rules="rules" ref="registerForm" label-width="100px" class="registerForm">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="registerUser.name" autocomplete="off" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="registerUser.email" autocomplete="off" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="registerUser.password" autocomplete="off" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="password2">
          <el-input type="password" v-model="registerUser.password2" autocomplete="off" placeholder="请确认密码"></el-input>
        </el-form-item>
        <el-form-item label="选择身份" prop="identity">
          <el-select placeholder="请选择身份" v-model="registerUser.identity">
            <el-option label="管理员" value="admin"></el-option>
            <el-option label="员工" value="employee"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('registerForm')">提交</el-button>
          <el-button type="primary" @click="resetForm('registerForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>
<script>
import { register } from '@/api/user/register'
export default {
  name: 'register',
  data () {
    // 密码校验
    let validatePass = (rule, value, callback) => {
      if (value !== this.registerUser.password) {
        callback(new Error('两次输入的密码不一致'))
      } else {
        callback()
      }
    }
    return {
      registerUser: {
        name: '',
        password: '',
        password2: '',
        email: '',
        identity: ''
      },
      rules: {
        name: [
          { trigger: 'blur', required: true, message: '请输入用户名' },
          { min: 2, max: 8, message: '长度在2-8之间', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 10, message: '长度在6-10位之间', trigger: 'blur' }
        ],
        password2: [
          { required: true, message: '请再输入密码', trigger: 'blur' },
          { min: 6, max: 10, message: '长度在6-10位之间', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          register(this.registerUser)
            .then(res => {
              this.$message({
                message: '恭喜，账号注册成功',
                type: 'success'
              })
              this.$router.push('/login')
            }, err => {console.log(err)})
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
<style scoped lang="stylus">
  .register
    h1
      margin:100px auto
      text-align: center
      font-size: 40px
      color: #666
  .form-area
    width:50vw;
    margin:20px auto
</style>
