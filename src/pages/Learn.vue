<template lang="pug">
  v-content
    v-card-media(v-if="article" :src="article.img" height="360px")
      .black-overlay
      v-progress-circular(
        :size="100"
        :width="15"
        :rotate="-90"
        :value="article.progress"
        style="margin-top: auto; margin-left: 15px; margin-bottom: 15px; position: relative"
        color="green") {{ article.progress || 0 }}%
      h3.display-2.white--text(style="margin-top: auto; margin-left: 15px; margin-bottom: 15px; position: relative") {{ article.title }}
    v-container(fluid)
      v-layout(
        column
        align-center
        justify-center
        v-touch="detectSwipe")
        v-flex(style="display: flex" xs12, sm6, offset-sm3 align-center)
          v-card
            v-card-title(primary-title)
              div
                h3.headline.mb-0(v-if="activeWord") {{ activeWord.word }}
                v-btn(flat color="primary" @click="speak(activeWord.word)") Listen
                  v-icon(light color='blue') volume_up
            //- v-card-actions
            //-   v-btn(flat, color='orange') Share
            //-   v-btn(flat, color='orange') Explore
</template>

<script>
  export default {
    data () {
      return {
        words: [],
        toLearnWords: [],
        article: null,
        activeWord: null,
        swipeDirection: 'None',
        detectSwipe: {
          left: () => this.swipe('Left'),
          right: () => this.swipe('Right'),
          up: () => this.addToStudied(this.activeWord),
          down: () => this.addToStudy(this.activeWord)
        }
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
      },
      swipe (direction) {
        this.swipeDirection = direction
      },
      speak (word) {
        window.responsiveVoice.speak(word)
      },
      addToStudied (word) {
        this.$db.learnedWords.add({
          id: word.id,
          word: word.word,
          translate: '',
          learned: true
        }).then((id) => {
          this.$db.words
            .where('id')
            .equals(id)
            .delete()
            .then(this.update)
            .catch(console.log)
        }).catch(console.log)
      },
      addToStudy (word) {
        this.toLearnWords.push(word)
      }
    }
  }
</script>
