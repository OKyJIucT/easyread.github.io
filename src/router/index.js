import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/pages/Main'
import Auth from '@/pages/Auth'
import Words from '@/pages/Words'
import Learn from '@/pages/Learn'
import Articles from '@/pages/Articles'
import Registration from '@/pages/Registration'
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
      path: '/registration',
      name: 'Registration',
      component: Registration
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
    },
    {
      path: '/study/:id',
      name: 'Learn',
      component: Learn,
      beforeEnter: requireAuth
    }
  ]
})

function requireAuth (to, from, next) {
  if (store.getters.isLoggedIn) {
    next()
  } else {
    next('/auth')
  }
}

export default router
