const LOGIN = 'LOGIN'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGOUT = 'LOGOUT'
const ADD_TO_ARTICLES = 'ADD_TO_ARTICLES'
const UPDATE_ARTICLES = 'UPDATE_ARTICLES'

import Vue from 'vue'
import Vuex from 'vuex'
import { idb } from './../idb'

const db = idb.db

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: !!localStorage.getItem('token'),
    articles: [],
    learnedWords: []
  },
  mutations: {
    [LOGIN] (state) {
      state.pending = true
    },
    [LOGIN_SUCCESS] (state) {
      state.isLoggedIn = true
      state.pending = false
    },
    [LOGOUT] (state) {
      state.isLoggedIn = false
    },
    [ADD_TO_ARTICLES] (state, payload) {
      if (!state.articles.includes(payload)) {
        state.articles.push(payload)
      }
    },
    [UPDATE_ARTICLES] (state, payload) {
      state.articles = payload
    }
  },
  modules: idb.modules,
  actions: {
    updateArticles({ commit }) {
      db.articles.toArray().then((articles) => {
        console.log(articles)
        commit(UPDATE_ARTICLES, articles)
      }).catch(console.log)
    },
    login({ commit }, creds) {
      commit(LOGIN)
      return new Promise(resolve => {
        setTimeout(() => {
          localStorage.setItem('token', 'JWT')
          commit(LOGIN_SUCCESS)
          resolve()
        }, 1000)
      })
    },
    logout({ commit }) {
      localStorage.removeItem('token')
      commit(LOGOUT)
    }
  },
  getters: {
    isLoggedIn: state => state.isLoggedIn,
    articles: state => state.articles,
    learnedWords: state => state.learnedWords
  },
  plugins: [ idb.plugin ]
})
