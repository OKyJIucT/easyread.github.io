import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import auth from './modules/auth'
import words from './modules/words'
import articles from './modules/articles'

Vue.use(Vuex)

export default new Vuex.Store({
  actions: actions,
  modules: {
    auth,
    words,
    articles
  }
})
