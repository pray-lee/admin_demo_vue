<template>
  <div class="index">
    <HeaderNav></HeaderNav>
    <LeftNav></LeftNav>
    <router-view></router-view>
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
