import { idb } from './../idb'
import firebase from 'firebase'
import router from './../router'
import {
  LOGIN,
  LOGOUT,
  UPDATE_ARTICLES,
  UPDATE_LEARNED_WORDS
} from './mutations'
const db = idb.db

export default {
  registration({ commit }, creds) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(creds.email, creds.password)
      .then((res) => {
        commit(LOGIN, res)
        router.push('/')
      }).catch(console.log)
  },
  me({ commit }) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        commit(LOGIN, user)
        router.push('/')
      }
      console.log('ME ==>>', user)
    })
  },
  login({ commit }, creds) {
    firebase
      .auth()
      .signInWithEmailAndPassword(creds.email, creds.password)
      .then((res) => {
        commit(LOGIN, res)
        router.push('/')
      }).catch(console.log)
  },
  loginFacebook({ commit }) {
    const provider = new firebase.auth.FacebookAuthProvider()
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((res) => {
        commit(LOGIN, res.user)
      })
  },
  logout({ commit }) {
    firebase
      .auth()
      .signOut()
      .then(() => { commit(LOGOUT) })
      .catch(console.log)
  },
  updateArticles({ commit }) {
    db.articles.toArray().then((articles) => {
      commit(UPDATE_ARTICLES, articles)
    }).catch(console.log)
  },
  updateLearnedWords({ commit }) {
    db.learnedWords.toArray().then((words) => {
      commit(UPDATE_LEARNED_WORDS, words)
    }).catch(console.log)
  }
}
