<template lang="pug">
  v-content(v-if="article")
    v-card-media(:src="article.img" height="360px")
      .black-overlay
      v-progress-circular(
        :size="100"
        :width="15"
        :rotate="-90"
        :value="article.progress"
        style="margin-top: auto; margin-left: 15px; margin-bottom: 15px; position: relative"
        color="green") {{ article.progress || 0 }}%
      h3.display-2.white--text(style="margin-top: auto; margin-left: 15px; margin-bottom: 15px; position: relative") {{ article.title }}
    v-container
      v-flex(xs12 sm10 md8 lg6 offset-lg3 offset-md2 offset-sm1)
        v-card-text {{ article.text }}

</template>

<script>
  export default {
    data () {
      return {
        words: [],
        toLearnWords: [],
        article: null,
        activeWord: null
      }
    },
    mounted: function () {
      this.update()
       this.$db.articles.get({id: this.$route.params.id}, (res) => {
         this.article = res
         console.log(res)
       })
    },
    methods: {
      update () {
        this.$db.words.toArray()
        .then((words) => {
          this.words = words
        }).then((words) => {
          this.activeWord = this.words[0]
        }).catch(console.log)

        this.$db.learnedWords.toArray()
          .then(console.log)
          .catch(console.log)
      }
    }
  }
</script>