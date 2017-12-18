const LOGIN = 'LOGIN'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGOUT = 'LOGOUT'
const ADD_TO_ARTICLES = 'ADD_TO_ARTICLES'

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: !!localStorage.getItem('token'),
    articles: []
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
    }
  },
  actions: {
    login ({ commit }, creds) {
      commit(LOGIN)
      return new Promise(resolve => {
        setTimeout(() => {
          localStorage.setItem('token', 'JWT')
          commit(LOGIN_SUCCESS)
          resolve()
        }, 1000)
      })
    },
    logout ({ commit }) {
      localStorage.removeItem('token')
      commit(LOGOUT)
    }
  },
  getters: {
    isLoggedIn: state => {
      return state.isLoggedIn
    },
    articles: state => {
      return state.articles
    }
  }
})
