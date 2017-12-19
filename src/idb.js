import Vue from 'vue'
import VueIdb from 'vue-idb'

Vue.use(VueIdb)

export const idb = new VueIdb({
  version: 1,
  database: 'wordsdb',
  schemas: [
    { words: 'id, word, translate' },
    { learnedWords: 'id, word, translate, learned' },
    { articles: 'id, name, description, words, progress' }
  ]
})
