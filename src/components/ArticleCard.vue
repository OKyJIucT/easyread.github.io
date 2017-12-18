<template lang="pug">
  v-card
    v-card-media(:src="img || './../static/img/cap.png'" height="360px")
    v-card-title(primary-title)
      div(style="width: 100%")
        v-text-field(
          v-if="!title"
          name="textTitle" 
          label="Title"
          v-model="textTitle")
        h3(class="headline mb-0" v-if="title") {{ title }}

        div {{ shortDescription }}
        div Всего слов: {{ wordsCount || 0 }}
        div Уникальных слов: {{ uniqWordsCount || 0 }}
    v-card-actions
      v-btn(flat color="orange" @click="addToArticles()") add to list
      v-btn(flat color="orange") study
</template>

<script>
 import { uuid } from 'vue-idb'

export default {
  name: 'article-card',
  data () {
    return {
      textTitle: null,
      shortDescription: null,
      id: uuid()
    }
  },
  mounted: function () {
    if (this.description) {
      this.shortDescription = `${this.description.split(' ').slice(0, 35).join(' ')}...`
    } else {
      this.shortDescription = 'Без описания'
    }
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
    addToArticles () {
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

<style lang="stylus">

</style>
