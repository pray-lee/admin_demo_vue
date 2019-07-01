import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// types
const type = {
  SET_USER: 'SET_USER',
  SET_AUTH: 'SET_AUTH'
}

// state
const state = {
  user: {},
  isAuth: false
}

// getters
const getters = {
  isAuth: state => state.isAuth,
  user: state => state.user
}

//actions
const actions = {
  setAuth ({commit}, isAuth) {
    console.log(isAuth)
    commit(type.SET_AUTH, isAuth)
  },
  setUser ({commit}, user) {
    commit(type.SET_USER, user)
  }
}

//mutations
const mutations = {
  [type.SET_USER] (state, user) {
    if (user) state.user = user
    else state.user = {}
  },
  [type.SET_AUTH] (state, isAuth) {
    if (isAuth) state.isAuth = isAuth
    else state.isAuth = false
  }
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
