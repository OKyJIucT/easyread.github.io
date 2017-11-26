import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/pages/Main'
import Words from '@/pages/Words'
import Articles from '@/pages/Articles'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
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
