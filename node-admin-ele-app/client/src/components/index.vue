<template>
  <div class="index">
    <HeaderNav></HeaderNav>
    <LeftNav></LeftNav>
    <main class="main-area">
      <router-view></router-view>
    </main>
  </div>
</template>
<script>
import HeaderNav from './headerNav'
import LeftNav from './leftNav'
export default {
  name: 'index',
  components: {
    HeaderNav,
    LeftNav
  }
}
</script>
<style lang="stylus" scoped>
  .main-area
    overflow-x: hidden
    overflow-y:scroll
    height:calc(100vh - 60px)
</style>
