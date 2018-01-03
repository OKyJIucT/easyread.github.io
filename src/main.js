// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'

import App from './App'
import router from './router'
import store from './store'
import firebase from 'firebase'

Vue.use(Vuetify)
Vue.use(Vuex)
Vue.config.productionTip = false

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyB7ObifhTX1-mCmidN_WlIt5MfX2yyOxKw',
  authDomain: 'e-lingo.firebaseapp.com',
  databaseURL: 'https://e-lingo.firebaseio.com',
  projectId: 'e-lingo',
  storageBucket: '',
  messagingSenderId: '939796598497'
}

firebase.initializeApp(config)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
