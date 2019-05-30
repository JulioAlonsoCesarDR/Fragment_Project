import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/login'

import Vuex from 'vuex'
import store from '../store'

Vue.use(VueRouter)
Vue.use(Vuex)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    name: 'Login',
    path: '/login',
    component: Login
  },

]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.path === '/login')) {
    if (store.getters.isLoggedIn) {
      next('/profile')
      return
    } else {
      next()
    }
  }

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
})

export default router
