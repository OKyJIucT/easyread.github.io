<template lang="pug">
  v-card
    v-card-media(:src="article.img || randomImage" height="360px")
      .black-overlay
      v-progress-circular(
        :size="100"
        :width="15"
        :rotate="-90"
        :value="article.progress"
        style="margin-top: auto; margin-left: 15px; margin-bottom: 15px"
        color="green") {{ article.progress || 0 }}%
    v-card-title(primary-title)
      div(style="width: 100%")
        v-text-field(
          v-if="!article.title"
          name="title" 
          label="Заголовок"
          v-model="title")
        h3(class="headline mb-0" v-if="article.title") {{ article.title }}

        div.mb-3 {{ shortDescription }}
        v-chip(color="green" text-color="white")
          v-avatar(class="green darken-4") {{ article.wordsCount || 0 }}
          | Всего слов
        v-chip(color="green" text-color="white")
          v-avatar(class="green darken-4") {{ article.uniqWordsCount || 0 }}
          | Уникальных слов
    v-card-actions
      v-btn(flat color="orange" v-if="isNew" @click="addToArticles()") Добавить в список
      v-btn(flat color="orange" v-if="!isNew" @click="removeFromArticles()") Удалить
      v-btn(flat color="orange" @click="goStudy()") Учить
</template>

<script>
import { uuid } from 'vue-idb'

export default {
  name: 'article-card',
  data() {
    return {
      title: null,
      id: uuid(),
      randomImage: `./../static/${Math.floor(Math.random() * 6) + 1}.png`
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
        id: this.id,
        img: this.article.img || this.randomImage,
        link: this.article.link,
        text: this.article.text,
        title: this.article.title || this.title || 'Без заголовка',
        wordsCount: this.article.wordsCount,
        uniqWordsCount: this.article.uniqWordsCount
      }).then((res) => {
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
    },
    goStudy() {
      console.log('go study')
      this.$router.push({path: `study/${this.article.id}`})
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
