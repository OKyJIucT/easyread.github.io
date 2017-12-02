import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/pages/Main'
import Words from '@/pages/Words'
import Auth from '@/pages/Auth'
import Articles from '@/pages/Articles'
import store from '@/store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
      beforeEnter: requireAuth
    },
    {
      path: '/auth',
      name: 'Auth',
      component: Auth
    },
    {
      path: '/words',
      name: 'Words',
      component: Words,
      beforeEnter: requireAuth
    },
    {
      path: '/articles',
      name: 'Articles',
      component: Articles,
      beforeEnter: requireAuth
    }
  ]
})

function requireAuth (to, from, next) {
  if (store.getters.isLoggedIn) {
    console.log('resolve router')
    next()
  } else {
    console.log('redirect to auth')
    next('/auth')
  }
}

export default router
