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
  import { uuid } from 'vue-idb'
  // import axios from 'axios'

  export default {
    data () {
      return {
        words: [],
        toLearnWords: [],
        uniqTextArray: [],
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
      this.$store.dispatch('getUserArticle', this.$route.params.id).then((article) => {
        this.article = article
        console.log(article)
        this.parse()
      }).catch(console.log)
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
          .sort().map(item => ({id: uuid(), value: item}))
        this.activeWord = this.uniqTextArray[0]
        // axios.get(`https://api.qwant.com/api/search/images?count=10&offset=1&q=${this.activeWord.word}`).then((res) => {
        //   console.log(res)
        // })
        console.log('Новые слова в статье', this.uniqTextArray)
      },
      update() {
        this.$db.words.toArray().then((words) => { this.words = words })
        this.$db.learnedWords.toArray().then(console.log).catch(console.log)
      },
      swipe(direction) {
        this.swipeDirection = direction
      },
      speak(word) {
        window.responsiveVoice.speak(word)
      },
      addToStudied(word) {
        this.$store.dispatch('addWordToStudied', {
          id: word.id,
          value: word.value
        }).then((res) => {
          console.log('res', res)
          this.$emit('added')
        })
      },
      addToStudy (word) {
        this.toLearnWords.push(word)
      }
    }
  }
</script>
