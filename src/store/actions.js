import firebase from 'firebase'
import router from './../router'
import store from './index'
import {
  LOGIN,
  LOGOUT,
  ADD_TO_ARTICLES,
  REMOVE_ARTICLE,
  ADD_TO_LEARNED_WORDS,
  UPDATE_LEARNED_WORDS,
  UPDATE_ARTICLES
} from './mutations'
import axios from 'axios'
const API_URL = 'https://translate.yandex.net/api/v1.5/tr.json'
const API_KEY = 'trnsl.1.1.20171130T120759Z.8231e8a635e67fbb.fee57266a0cdfa56496c1aed4fcbf8a9d50f72a8'

export default {
  registration({ commit }, creds) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(creds.email, creds.password)
      .then((res) => {
        store.dispatch('writeUser', res)
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
    })
  },
  login({ commit }, creds) {
    return Promise.resolve().then(() => {
      return firebase
        .auth()
        .signInWithEmailAndPassword(creds.email, creds.password)
        .then((res) => {
          commit(LOGIN, res)
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
          commit(LOGIN, res.user)
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
        commit(LOGIN, res.user)
        store.dispatch('loadData')
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
    firebase
      .database()
      .ref(`articles/${store.getters.user.uid}/${article.id}`)
      .set(article)
      .then(() => {
        commit(ADD_TO_ARTICLES, article)
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
  getArticles({ commit }) {
    firebase
      .database()
      .ref(`articles/${store.getters.user.uid}`)
      .once('value')
      .then(res => {
        const result = res.val() ? Object.values(res.val()) : []
        commit(UPDATE_ARTICLES, result)
        return result
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
    axios
      .get(`${API_URL}/translate?key=${API_KEY}&text=${word.value}&lang=en-ru&format=plain&options=1`)
      .then((res) => {
        const data = {
          word: word.value.charAt(0).toUpperCase() + word.value.slice(1),
          translate: res.data.text[0]
        }
        firebase
          .database()
          .ref(`users/${store.getters.user.uid}/words/${word.value}`)
          .set(data)
          .then(() => {
            commit(ADD_TO_LEARNED_WORDS, data)
            store.dispatch('addWord', data)
            return word
          })
      })
  },
  addWord({ commit }, wordData) {
    firebase
      .database()
      .ref(`words/${wordData.word}`)
      .set(wordData)
      .then(word => word)
  },
  getWords({ commit }) {
    firebase
      .database()
      .ref(`users/${store.getters.user.uid}/words`)
      .once('value')
      .then(res => {
        commit(UPDATE_LEARNED_WORDS, res.val() ? Object.values(res.val()) : [])
        return res.val() ? Object.values(res.val()) : []
    })
  },
  getWord({ commit }, word) {
    return Promise.resolve().then(() => {
      return firebase
        .database()
        .ref(`words`)
        .child(word.charAt(0).toUpperCase() + word.slice(1))
        .once('value')
        .then(res => res.val())
    })
  },
  loadData() {
    store.dispatch('getWords')
    store.dispatch('getArticles')
  }
}
