import * as types from './../mutations'
import router from './../../router'
import firebase from 'firebase'
import store from './../index'

const state = {
  isLoggedIn: !!this.user,
  user: null
}

const getters = {
  isLoggedIn: state => state.isLoggedIn,
  user: state => state.user
}

const actions = {
  registration({ commit }, creds) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(creds.email, creds.password)
      .then((res) => {
        store.dispatch('writeUser', res)
        commit(types.LOGIN, res)
        router.push('/')
      }).catch(console.log)
  },
  me({ commit }) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        commit(types.LOGIN, user)
        router.push('/')
      }
    })
  },
  login({ commit }, creds) {
    return Promise.resolve().then(() => {
      return firebase
        .auth()
        .signInWithEmailAndPassword(creds.email, creds.password)
        .then((res) => {
          commit(types.LOGIN, res)
          store.dispatch('loadData')
          router.push('/')
          return res
        }).catch(console.log)
    })
  },
  loginFacebook({ commit }) {
    const provider = new firebase.auth.FacebookAuthProvider()
    return Promise.resolve().then(() => {
      return firebase
        .auth()
        .signInWithPopup(provider)
        .then((res) => {
          if (res.additionalUserInfo.isNewUser) {
            store.dispatch('writeUser', res.user)
          }
          commit(types.LOGIN, res.user)
          store.dispatch('loadData')
          return res.user
        }).catch(console.log)
    })
  },
  loginGoogle({ commit }) {
    const provider = new firebase.auth.GoogleAuthProvider()
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((res) => {
        if (res.additionalUserInfo.isNewUser) {
          store.dispatch('writeUser', res.user)
        }
        commit(types.LOGIN, res.user)
        store.dispatch('loadData')
        return res.user
      }).catch(console.log)
  },
  logout({ commit }) {
    firebase
      .auth()
      .signOut()
      .then(() => { commit(types.LOGOUT) })
      .catch(console.log)
  },
  writeUser({ commit }, user) {
    firebase
      .database()
      .ref(`users/${user.uid}`)
      .set({
        id: user.uid,
        display_name: user.displayName,
        email: user.email,
        timestamp: Date.now(),
        level: 1,
        articles: null,
        words: null,
        phrasal_verbs: null
      })
      .then(word => word)
  }
}

const mutations = {
  [types.LOGIN] (state, payload) {
    state.isLoggedIn = true
    state.user = payload
  },
  [types.LOGOUT] (state) {
    state.isLoggedIn = false
    state.user = null
    state.articles = []
    state.learnedWords = []
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
