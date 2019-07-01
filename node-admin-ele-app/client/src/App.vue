<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
import jwt_decoded from 'jwt-decode'
export default {
  name: 'app',
  created () {
    const token = localStorage.getItem('eleToken')
    if (token) {
      const user = jwt_decoded(token)
      this.$store.dispatch('setAuth', !this.isEmpty(user))
      this.$store.dispatch('setUser', user)
    }
  },
  methods: {
    isEmpty (obj) {
      return Object.keys(obj).length === 0? true : false
    }
  }
}
</script>
<style>
html,
body,
#app {
    width:100vw;
    height:100vh
}
</style>
