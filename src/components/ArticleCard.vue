<template lang="pug">
  v-card
    v-card-media(:src="article.img || './../static/img/cap.png'" height="360px")
      .black-overlay
      v-progress-circular(
        :size="100"
        :width="15"
        :rotate="-90"
        :value="article.progress"
        style="margin-top: auto; margin-left: 15px; margin-bottom: 15px"
        color="green") {{ article.progress }}%
    v-card-title(primary-title)
      div(style="width: 100%")
        v-text-field(
          v-if="!article.title"
          name="title" 
          label="Заголовок"
          v-model="title")
        h3(class="headline mb-0" v-if="article.title") {{ rticle.title }}

        div {{ shortDescription }}
        v-chip(color="green" text-color="white")
          v-avatar(class="green darken-4") {{ article.wordsCount || 0 }}
          | Всего слов
        v-chip(color="green" text-color="white")
          v-avatar(class="green darken-4") {{ article.uniqWordsCount || 0 }}
          | Уникальных слов
    v-card-actions
      v-btn(flat color="orange" v-if="isNew" @click="addToArticles()") Добавить в список
      v-btn(flat color="orange" v-if="!isNew" @click="removeFromArticles()") Удалить
      v-btn(flat color="orange") Учить
</template>

<script>
import { uuid } from 'vue-idb'

export default {
  name: 'article-card',
  data() {
    return {
      title: null,
      id: uuid()
    }
  },
  computed: {
    progress() {
      return this.$store.getters.learnedWords.length * 100 / this.article.uniqWordsCount
    },
    shortDescription() {
      if (this.article.text) {
        return `${this.article.text.split(' ').slice(0, 35).join(' ')}...`
      } else {
        return 'Без описания'
      }
    }
  },
  props: [
    'article',
    'isNew'
  ],
  methods: {
    addToArticles() {
      this.$db.articles.add({
        id: this.article.id,
        img: this.article.img || './../static/img/cap.png',
        link: this.article.link,
        title: this.article.title || this.title || 'Без заголовка',
        wordsCount: this.article.wordsCount,
        description: this.article.description,
        uniqWordsCount: this.article.uniqWordsCount
      }).then(() => {
        this.$store.commit('ADD_TO_ARTICLES', this.id)
        this.$emit('added')
      }).catch(console.log)
    },

    removeFromArticles() {
      this.$db.articles
        .where('id')
        .equals(this.article.id)
        .delete()
        .then((deleteCount) => {
          this.$store.dispatch('updateArticles')
          this.$emit('remove')
        }).catch(console.log)
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
