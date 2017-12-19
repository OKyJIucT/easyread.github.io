<template lang="pug">
  v-card
    v-card-media(:src="img || './../static/img/cap.png'" height="360px")
      .black-overlay
      v-progress-circular(
        :size="100"
        :width="15"
        :rotate="-90"
        :value="progress"
        style="margin-top: auto; margin-left: 15px; margin-bottom: 15px"
        color="green") {{ progress }}%
    v-card-title(primary-title)
      div(style="width: 100%")
        v-text-field(
          v-if="!title"
          name="textTitle" 
          label="Заголовок"
          v-model="textTitle")
        h3(class="headline mb-0" v-if="title") {{ title }}

        div {{ shortDescription }}
        v-chip(color="green" text-color="white")
          v-avatar(class="green darken-4") {{ wordsCount || 0 }}
          | Всего слов
        v-chip(color="green" text-color="white")
          v-avatar(class="green darken-4") {{ uniqWordsCount || 0 }}
          | Уникальных слов
    v-card-actions
      v-btn(flat color="orange" @click="addToArticles()") Добавить в список
      v-btn(flat color="orange" @click="removeFromArticles()") Удалить
      v-btn(flat color="orange") Учить
</template>

<script>
import { uuid } from 'vue-idb'

export default {
  name: 'article-card',
  data() {
    return {
      textTitle: null,
      id: uuid()
    }
  },
  computed: {
    progress() {
      return this.$store.getters.learnedWords.length * 100 / this.uniqWordsCount
    },
    shortDescription() {
      if (this.description) {
        return `${this.description.split(' ').slice(0, 35).join(' ')}...`
      } else {
        return 'Без описания'
      }
    }
  },
  mounted: function() {
  },
  props: [
    'article',
    'img',
    'link',
    'title',
    'description',
    'wordsCount',
    'uniqWordsCount'
  ],
  methods: {
    addToArticles() {
      this.$db.articles.add({
        id: this.id,
        img: this.img || './../static/img/cap.png',
        link: this.link,
        title: this.title || this.textTitle || 'Без заголовка',
        description: this.description,
        wordsCount: this.wordsCount,
        uniqWordsCount: this.uniqWordsCount
      }).then(() => {
        this.$store.commit('ADD_TO_ARTICLES', this.id)
      }).catch(console.log)
    },

    removeFromArticles() {
      this.$db.articles
        .where('id')
        .equals(this.article.id)
        .delete()
        .then((deleteCount) => {
          console.log(`Deleted ${deleteCount} objects`)
          this.$store.dispatch('updateArticles')
          this.$emit('remove')
        }).catch(console.log)
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
