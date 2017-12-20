const LOGIN = 'LOGIN'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGOUT = 'LOGOUT'
const ADD_TO_ARTICLES = 'ADD_TO_ARTICLES'
const UPDATE_ARTICLES = 'UPDATE_ARTICLES'
const UPDATE_LEARNED_WORDS = 'UPDATE_LEARNED_WORDS'
const API_URL = 'https://mern-todoapp.herokuapp.com'

import Vue from 'vue'
import Vuex from 'vuex'
import { idb } from './../idb'
import axios from 'axios'

const db = idb.db

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: !!localStorage.getItem('token'),
    user: null,
    articles: [],
    learnedWords: []
  },
  mutations: {
    [LOGIN] (state) {
      state.pending = true
    },
    [LOGIN_SUCCESS] (state, payload) {
      state.isLoggedIn = true
      state.pending = false
      state.user = payload
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
    },
    [UPDATE_LEARNED_WORDS] (state, payload) {
      state.learnedWords = payload
    }
  },
  modules: idb.modules,
  actions: {
    updateArticles({ commit }) {
      db.articles.toArray().then((articles) => {
        commit(UPDATE_ARTICLES, articles)
      }).catch(console.log)
    },
    updateLearnedWords({ commit }) {
      db.learnedWords.toArray().then((words) => {
        commit(UPDATE_LEARNED_WORDS, words)
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
    registration({ commit }, creds) {
      commit(LOGIN)
      axios.post(`${API_URL}/users/login`, creds).then((res) => {
        console.log(res)
        commit(LOGIN_SUCCESS, res)
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
