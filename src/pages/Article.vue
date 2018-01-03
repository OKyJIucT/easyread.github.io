<template lang="pug">
  v-content(v-if="article")
    v-card-media(:src="article.img" height="360px")
      .black-overlay
      v-progress-circular(
        :size="100"
        :width="15"
        :rotate="-90"
        :value="+progress"
        style="margin-top: auto; margin-left: 15px; margin-bottom: 15px; position: relative"
        color="green") {{ progress || 0 }}%
      h3.display-2.white--text(style="margin-top: auto; margin-left: 15px; margin-bottom: 15px; position: relative") {{ article.title }}
    v-container
      v-flex(xs12 sm10 md8 lg6 offset-lg3 offset-md2 offset-sm1)
        v-card-text 
          pre
            v-popover.word(
              offset="0" 
              v-for="(word, index) in words"
              @show="translate(word, index)"
              :key="index")
              v-btn.word(
                :flat="activeIndex !== index" 
                :color="activeIndex === index ? 'success' : null") {{ word }}&nbsp;

              template(slot="popover")
                v-card.elevation-5
                  v-card-title(primary-title)
                    div
                      p.caption.mb-0 Английский
                      h3.headline.mb-0 {{ word }}
                        v-btn(flat icon color="pink" @click="speak(word)")
                          v-icon(light color='blue') volume_up
                      p.caption.mb-0 Русский
                      h3.headline.mb-0 {{ translateWord || 'Перевод...' }}

                  v-card-actions
                    v-btn(flat, color='orange' @click="") На изучение
                    v-btn(flat, color='orange' @click="") Уже знаю

</template>

<script>
  import axios from 'axios'
  // import Popper from 'vue-popperjs'
  // import 'vue-popperjs/dist/css/vue-popper.css'
  const API_URL = 'https://translate.yandex.net/api/v1.5/tr.json'
  const API_KEY = 'trnsl.1.1.20171130T120759Z.8231e8a635e67fbb.fee57266a0cdfa56496c1aed4fcbf8a9d50f72a8'

  export default {
    // components: {
    //   'popper': Popper
    // },
    data () {
      return {
        activeIndex: null,
        activeColor: null,
        words: [],
        translateWord: null,
        article: null
      }
    },
    computed: {
      learnedWords() {
        return this.$store.getters.learnedWords
      },
      progress() {
        if (this.words.length && this.learnedWords.length) {
          return (this.learnedWords.length * 100 / this.words.length).toFixed()
        } else {
          return 0
        }
      }
    },
    mounted: function () {
      this.$store.dispatch('getUserArticle', this.$route.params.id).then((article) => {
        this.article = article
        this.splitText()
      }).catch(console.log)
      console.log(this.progress)
    },
    methods: {
      clear() {
        this.activeIndex = null
        this.translateWord = null
      },
      speak (word) {
        window.responsiveVoice.speak(word)
      },
      translate(word, index) {
        this.activeIndex = index
        axios
          .get(`${API_URL}/translate?key=${API_KEY}&text=${word}&lang=en-ru&format=plain&options=1`)
          .then((res) => {
            this.translateWord = res.data.text[0]
          })
      },
      splitText() {
        const textArray = this.article.text.split(' ')
        this.words = textArray
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .word 
    display inline-flex
    height auto
    min-width initial
    margin 0
    text-transform initial
    font-weight 400
    & >>> div 
      padding 0 !important

  .popper
    border initial
    background-color initial 
    color initial 
    box-shadow initial
    text-align initial
    border-radius initial
  

</style>
