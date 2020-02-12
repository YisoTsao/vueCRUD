import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/Index'
import login from '@/components/LogIn'
import signup from '@/components/SignUp'
import users from '@/components/Users'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
      path: '/index',
      alias: '/',
      name: 'index',
      component: index
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/users',
      name: 'users',
      component: users
    },
    {
      path: '/signup',
      name: 'signup',
      component: signup
    }
  ]
})