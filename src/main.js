// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
import VueIdb from 'vue-idb'

import App from './App'
import router from './router'

Vue.use(Vuetify)
Vue.use(VueIdb)
Vue.config.productionTip = false

const idb = new VueIdb({
  version: 1,
  database: 'words',
  schemas: [
    {
      words: 'id, word, translate'
    }
  ]
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  idb: idb,
  router,
  template: '<App/>',
  components: { App }
})
