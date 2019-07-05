<template>
  <div class="left-nav">
    <el-row class="menu-page">
      <el-col>
        <el-menu
          :default-active="$route.path.split('/').pop()"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="yellow">
          <Item :item="item" v-for="item in items" :key="item.path"></Item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import Item from './liItem'

  export default {
    name: 'leftUav',
    components: {
      Item
    },
    data() {
      return {
        items: [
          {name: '主页', path: 'home', children: []},
          {name: '资金管理', path: 'fund', children: [{path: 'fundlist', name: '资金流水'}]},
          {name: '信息管理', path: 'info', children: [{path: 'infoshow', name: '个人信息'}]}
        ]
      }
    }
  }
</script>
<style lang="stylus" scoped>
  .left-nav
    width: 220px
    float: left

    .el-menu
      min-height: calc(100vh - 60px)
      border: 0

</style>
