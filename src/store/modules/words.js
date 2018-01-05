import * as types from './../mutations'
import firebase from 'firebase'
import store from './../index'
import axios from 'axios'
const API_URL = 'https://translate.yandex.net/api/v1.5/tr.json'
const API_KEY = 'trnsl.1.1.20171130T120759Z.8231e8a635e67fbb.fee57266a0cdfa56496c1aed4fcbf8a9d50f72a8'

const state = {
  learnedWords: []
}

const getters = {
  learnedWords: state => state.learnedWords
}

const actions = {
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
            commit(types.ADD_TO_LEARNED_WORDS, data)
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
        commit(types.UPDATE_LEARNED_WORDS, res.val() ? Object.values(res.val()) : [])
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
  }
}

const mutations = {
  [types.ADD_TO_LEARNED_WORDS] (state, payload) {
    if (!state.learnedWords.includes(payload)) {
      state.learnedWords.push(payload)
    }
  },
  [types.UPDATE_LEARNED_WORDS] (state, payload) {
    state.learnedWords = payload
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
