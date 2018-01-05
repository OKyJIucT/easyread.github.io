import * as types from './../mutations'
import firebase from 'firebase'
import store from './../index'

const state = {
  articles: []
}

const getters = {
  articles: state => state.articles
}

const actions = {
  addArticle({ commit }, article) {
    firebase
      .database()
      .ref(`articles/${store.getters.user.uid}/${article.id}`)
      .set(article)
      .then(() => {
        commit(types.ADD_TO_ARTICLES, article)
      })
  },
  removeArticle({ commit }, id) {
    return Promise.resolve().then(() => {
      firebase
        .database()
        .ref(`articles/${store.getters.user.uid}/${id.id}`)
        .remove()
      commit(types.REMOVE_ARTICLE, id)
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
        commit(types.UPDATE_ARTICLES, result)
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
  }
}

const mutations = {
  [types.ADD_TO_ARTICLES] (state, payload) {
    if (!state.articles.includes(payload)) {
      state.articles.push(payload)
    }
  },
  [types.REMOVE_ARTICLE] (state, payload) {
    state.articles.splice(state.articles.indexOf(payload), 1)
  },
  [types.UPDATE_ARTICLES] (state, payload) {
    state.articles = payload
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
