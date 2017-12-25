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
                h3.headline.mb-0(v-if="activeWord") {{ activeWord.word }}
                v-btn(flat color="primary" @click="speak(activeWord.word)") Слушать
                  v-icon(light color='blue') volume_up
            v-card-actions
              v-btn(flat, color='orange' @click="addToStudy()") На изучение
              v-btn(flat, color='orange' @click="addToStudied()") Уже знаю
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
      this.update()
        this.$db.articles.get({id: this.$route.params.id}, (res) => {
          this.article = res
          this.parse()
          console.log(res)
       })
    },
    methods: {
      parse() {
        const textArray = this.article.text.split(' ')
        const sortUniq = _.uniq(textArray).filter(item => item.match(/^[a-zA-Z]+$/))
        this.uniqTextArray = sortUniq.filter(item => this.words.findIndex(t => t.word === item) < 0)
          .sort().map(item => ({id: uuid(), word: item}))
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
      addToStudied() {
        this.$db.learnedWords.add({
          id: this.activeWord.id,
          word: this.activeWord.word,
          translate: ''
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
