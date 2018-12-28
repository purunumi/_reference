import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Main from '../pages/Main'
import Login from '../pages/Login'

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Main
    },
    {
      path: '/login',
      component: Login
    }
  ]
})