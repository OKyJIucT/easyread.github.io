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
        img: this.img,
        link: this.link,
        title: this.title,
        description: this.description,
        wordsCount: this.wordsCount,
        uniqWordsCount: this.uniqWordsCount
      }).then(() => {
        this.$store.commit('ADD_TO_ARTICLES', this.id)
        console.log('done')
      }).catch(console.log)
    }
  }
}
</script>

<style lang="stylus" scoped>
.black-overlay
  position absolute
  width 100%
  height 100%
  &:after
    content ''
    display block
    position absolute
    top 0
    left 0
    right 0
    bottom 0
    background-color rgba(0,0,0,0.6)
</style>
