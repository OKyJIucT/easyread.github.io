import { idb } from './../idb'
import firebase from 'firebase'
import router from './../router'
import store from './index'
import {
  LOGIN,
  LOGOUT,
  UPDATE_ARTICLES,
  UPDATE_LEARNED_WORDS,
  ADD_TO_ARTICLES,
  REMOVE_ARTICLE
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
    return Promise.resolve().then(() => {
      return firebase
        .auth()
        .signInWithEmailAndPassword(creds.email, creds.password)
        .then((res) => {
          commit(LOGIN, res)
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
          commit(LOGIN, res.user)
          return res.user
        }).catch(console.log)
    })
  },
  logout({ commit }) {
    firebase
      .auth()
      .signOut()
      .then(() => { commit(LOGOUT) })
      .catch(console.log)
  },
  addArticle({ commit }, article) {
    return Promise.resolve().then(() => {
      firebase
        .database()
        .ref(`articles/${store.getters.user.uid}/${article.id}`)
        .set(article)
      commit(ADD_TO_ARTICLES, article.id)
      return true
    })
  },
  removeArticle({ commit }, id) {
    return Promise.resolve().then(() => {
      firebase
        .database()
        .ref(`articles/${store.getters.user.uid}/${id.id}`)
        .remove()
      commit(REMOVE_ARTICLE, id)
      return true
    })
  },
  getUserArticles({ commit }) {
    return Promise.resolve().then(() => {
      return firebase
        .database()
        .ref(`articles/${store.getters.user.uid}`)
        .once('value')
        .then(res => res.val())
    })
  },
  getUserArticle({ commit }, id) {
    return Promise.resolve().then(() => {
      return firebase
        .database()
        .ref(`articles/${store.getters.user.uid}`)
        .child(id)
        .once('value')
        .then(res => res.val())
    })
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
