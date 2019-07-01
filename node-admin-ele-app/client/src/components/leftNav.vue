<template>
  <div class="left-nav">
    <el-row class="menu-page">
      <el-col>
        <el-menu
          default-active="2"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <template v-for="item in items">
            <router-link v-if="!item.children.length" :to="item.path">
              <el-menu-item v-if="!item.children.length" :index="item.path">
                <i class="el-icon-setting"></i>
                <span slot="title">{{item.name}}</span>
              </el-menu-item>
            </router-link>
            <el-submenu :index="item.path" v-else>
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{item.name}}</span>
              </template>
              <router-link v-for="child in item.children" :to="child.path">
                <el-menu-item :index="child.path">{{child.name}}</el-menu-item>
              </router-link>
            </el-submenu>
          </template>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'leftUav',
  data () {
    return {
      items: [
        { name: '首页', path: 'home', children: [] },
        { name: '资金管理', path: 'fund', children: [ { path: 'fundlist', name: '资金流水' } ] },
        { name: '信息管理', path: 'info', children: [ { path: 'infoshow', name: '个人信息' } ] }
      ]
    }
  }
}
</script>
<style lang="stylus" scoped>
  .left-nav
    width: 220px
    .el-menu
      min-height:calc(100vh - 60px)
</style>
