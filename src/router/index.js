import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/pages/Main'
import Words from '@/pages/Words'
import Auth from '@/pages/Auth'
import Articles from '@/pages/Articles'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/auth',
      name: 'Auth',
      component: Auth
    },
    {
      path: '/words',
      name: 'Words',
      component: Words
    },
    {
      path: '/articles',
      name: 'Articles',
      component: Articles
    }
  ]
})
