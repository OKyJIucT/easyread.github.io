// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
import VueIdb from 'vue-idb'
import Vuex from 'vuex'

import App from './App'
import router from './router'
import store from './store'

Vue.use(Vuetify)
Vue.use(VueIdb)
Vue.use(Vuex)
Vue.config.productionTip = false

const idb = new VueIdb({
  version: 1,
  database: 'wordsdb',
  schemas: [
    { words: 'id, word, translate' },
    { learnedWords: 'id, word, translate, learned' },
    { articles: 'id, name, description, words, progress' }
  ]
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  idb: idb,
  store,
  router,
  template: '<App/>',
  components: { App }
})
