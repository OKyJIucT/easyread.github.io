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
    v-container(style="height: calc(100vh - 360px - 36px - 64px)")
      v-layout(
        fill-height
        align-center
        justify-center
        v-touch="detectSwipe")
        v-flex(xs12 sm8 align-center)
          v-card
            v-card-title(primary-title)
              div
                h3.headline.mb-0(v-if="activeWord") {{ activeWord.value }}
                v-btn(flat color="primary" @click="speak(activeWord.value)") Слушать
                  v-icon(light color='blue') volume_up
            v-card-actions
              v-btn(flat, color='orange' @click="addToStudy(activeWord)") На изучение
              v-btn(flat, color='orange' @click="addToStudied(activeWord)") Уже знаю
</template>

<script>
  import _ from 'lodash'

  export default {
    data () {
      return {
        words: [],
        toLearnWords: [],
        uniqTextArray: [],
        article: null,
        activeWordCount: 0,
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
      this.$store.dispatch('getWords').then(res => {
        this.words = res
        this.$store.dispatch('getUserArticle', this.$route.params.id).then((article) => {
          this.article = article
          this.parse()
        }).catch(console.log)
      })
    },
    computed: {
      activeWord() {
        return this.uniqTextArray[this.activeWordCount]
      }
    },
    methods: {
      parse() {
        const textArray = this.article.text
          .replace(/(?:\r\n|\r|\n)|—|-|:|,/g, '')
          .replace(/\./g, ' ')
          .replace(/\s\s+/g, ' ')
          .replace(/((\s*\S+)*)\s*/, '$1')
          .split(' ')
        const sortUniq = _.uniq(textArray).filter(item => item.match(/^[a-zA-Z]+$/))
        this.uniqTextArray = sortUniq.filter(item => this.words.findIndex(t => t.word === item) < 0)
          .sort().map(item => ({ value: item }))
      },
      swipe(direction) {
        this.swipeDirection = direction
      },
      speak(word) {
        window.responsiveVoice.speak(word)
      },
      addToStudied(word) {
        this.$store.dispatch('addWordToStudied', {
          value: word.value.charAt(0).toUpperCase() + word.value.slice(1)
        }).then((res) => {
          this.activeWordCount++
        })
      },
      addToStudy (word) {
        this.toLearnWords.push(word)
      }
    }
  }
</script>
