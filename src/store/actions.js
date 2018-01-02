import firebase from 'firebase'
import router from './../router'
import store from './index'
import {
  LOGIN,
  LOGOUT,
  ADD_TO_ARTICLES,
  REMOVE_ARTICLE
} from './mutations'

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
          if (!res.additionalUserInfo.isNewUser) {
            store.dispatch('writeUser', res.user)
          }
          console.log('res dith facebokk auth', res)
          commit(LOGIN, res.user)
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
        if (!res.additionalUserInfo.isNewUser) {
          commit('writeUser', res.user)
        }
        commit(LOGIN, res.user)
        return res.user
      }).catch(console.log)
  },
  logout({ commit }) {
    firebase
      .auth()
      .signOut()
      .then(() => { commit(LOGOUT) })
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
  addWordToStudied({ commit }, word) {
    firebase
      .database()
      .ref(`users/${store.getters.user.uid}/words`)
      .update({ [word.value]: true })
      .then(() => {
        console.log(word)
        store.dispatch('addWord', word)
        return word
      })
  },
  addWord({ commit }, word) {
    firebase
      .database()
      .ref(`words/${word.value}`)
      .set({
        word: word.value,
        translate: ''
      })
      .then(word => word)
  },
  getWords({ commit }) {
    return Promise.resolve().then(() => {
      return firebase
        .database()
        .ref(`words`)
        .once('value')
        .then(res => Object.values(res.val()))
    })
  }
}
