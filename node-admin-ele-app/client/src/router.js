import Vue from 'vue'
import Router from 'vue-router'
import Wrapper from './components/Wrapper'
import Index from './components/index'
import Home from './components/Home'
import InfoShow from './components/Info'
import FundList from './components/FundList'
import Register from './components/register'
import Login from './components/login'
import NotFound from './components/notfound'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
            path: '/',
            redirect: '/index'
        },
        {
            path: '/index',
            component: Index,
            children: [{
                path: '',
                component: Home
            }]
        },
        {
            path: '/fund',
            component: Index,
            children: [{
                path: 'fundlist',
                component: FundList
            }]
        },
        {
            path: '/info',
            component: Index,
            children: [{
                path: 'infoshow',
                component: InfoShow
            }]
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
            name: 'notFound',
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