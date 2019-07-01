import Vue from 'vue'
import Router from 'vue-router'
import Index from './components/index'
import Register from './components/register'
import Login from './components/login'
import NotFound from './components/notfound'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'index',
      component: Index
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '*',
      name: '404',
      component: NotFound
    }
  ]
})

// handle login logic by using router guard
router.beforeEach((to, from, next) => {
  const isLogin = localStorage.getItem('eleToken') ? true : false
  if (to.path === '/login' || to.path === '/register') {
    next()
  } else {
    isLogin ? next() : next('/login')
  }
})

export default router
