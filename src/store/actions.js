import store from './index'

export default {
  loadData() {
    store.dispatch('getWords')
    store.dispatch('getArticles')
  }
}
