<template>
  <li v-if="item.children">
    <template v-if="item.children.length == 0">
      <router-link :to=" '/' + item.path" class="linkActive">
        <el-menu-item :index="item.path">
          <i class="el-icon-menu"></i>
          {{item.name}}
        </el-menu-item>
      </router-link>
    </template>

    <el-submenu v-else :index="item.path">
      <template slot="title">
        <i class="el-icon-menu"></i>
        {{item.name}}
      </template>

      <template v-for="child in item.children">
        <item
          v-if="child.children&&child.children.length>0"
          :item="child"
          :key="child.path"/>
        <router-link :to="'/' + item.path + '/' + child.path" class="linkActive" v-else>
          <el-menu-item :key="child.path" :index="child.path">
            <i class="el-icon-location"></i>
            {{child.name}}
          </el-menu-item>
        </router-link>
      </template>
    </el-submenu>
  </li>
</template>
<script>
  export default {
    name: 'item',
    props: ["item"]
  }
</script>
<style lang="stylus" scoped>
  .linkActive
    display: block
    text-decoration: none
</style>
