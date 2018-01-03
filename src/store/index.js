import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import {
  LOGIN,
  LOGOUT,
  UPDATE_ARTICLES,
  UPDATE_LEARNED_WORDS,
  ADD_TO_ARTICLES,
  REMOVE_ARTICLE
} from './mutations'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: !!this.user,
    user: null,
    articles: [],
    learnedWords: []
  },
  mutations: {
    [LOGIN] (state, payload) {
      state.isLoggedIn = true
      state.user = payload
    },
    [LOGOUT] (state) {
      state.isLoggedIn = false
      state.user = null
    },
    [ADD_TO_ARTICLES] (state, payload) {
      if (!state.articles.includes(payload)) {
        state.articles.push(payload)
      }
    },
    [REMOVE_ARTICLE] (state, payload) {
      state.articles.splice(state.articles.indexOf(payload), 1)
    },
    [UPDATE_ARTICLES] (state, payload) {
      state.articles = payload
    },
    [UPDATE_LEARNED_WORDS] (state, payload) {
      state.learnedWords = payload
    }
  },
  getters: {
    isLoggedIn: state => state.isLoggedIn,
    articles: state => state.articles,
    learnedWords: state => state.learnedWords,
    user: state => state.user
  },
  actions: actions
})
