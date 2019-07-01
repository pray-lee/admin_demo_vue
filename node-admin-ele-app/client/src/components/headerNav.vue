<template>
  <header class="header">
    <el-row>
      <el-col :span="12">
        <img class="avatar" src="../assets/1.jpg" alt="">
        <span class="title">后台管理系统</span>
      </el-col>
      <el-col :span="12" class="user-area">
        <div class="user-wrapper">
          <div class="user-info">
            <p>欢迎</p>
            <p>{{user.name}}</p>
          </div>
          <el-dropdown @command="setDialog" class="down-icon">
            <span class="el-dropdown-link">
              <i class="el-icon-caret-bottom"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
    </el-row>
  </header>
</template>
<script>
export default {
  name: 'headerNav',
  computed: {
    user () {
      return this.$store.getters.user
    }
  },
  methods: {
    setDialog (type) {
      switch (type) {
        case 'logout':
          this.logout()
          break
      }
    },
    logout () {
      // clear token
      localStorage.removeItem('eleToken')
      this.$store.dispatch('clearCurrentState')
      this.$router.push('/login')
    }
  }
}
</script>
<style lang="stylus" scoped>
.header
  height: 60px
  padding: 7.5px 10px
  background: rgb(84, 92, 100)
  color:#fff
  .avatar
    width: 45px
    height: 45px
    border-radius: 50%
    vertical-align: middle
    margin-right: 15px
  .title
    vertical-align: middle
  .user-wrapper
    min-width: 80px
    float: right
    .user-info
      display:inline-block
      text-align: center
      vertical-align: middle
    .down-icon
      height: 35px
      margin-left: 20px
      display:inline-block
</style>
