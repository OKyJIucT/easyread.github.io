const LOGIN = 'LOGIN'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGOUT = 'LOGOUT'
const ADD_TO_ARTICLES = 'ADD_TO_ARTICLES'
const UPDATE_ARTICLES = 'UPDATE_ARTICLES'
const UPDATE_LEARNED_WORDS = 'UPDATE_LEARNED_WORDS'

import firebase from 'firebase'
import Vue from 'vue'
import Vuex from 'vuex'
import { idb } from './../idb'

const db = idb.db
const $router = this.$router

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
          localStorage.setItem('token', creds)
          commit(LOGIN_SUCCESS)
          resolve()
        }, 1000)
      })
    },
    registration({ commit }, creds) {
      firebase.auth().createUserWithEmailAndPassword(creds.email, creds.password)
      .then((res) => {
        console.log(res)
        commit(LOGIN, res.refreshToken)
        $router.push('/')
      }).catch((err) => {
        console.log('Ошибка', err)
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
