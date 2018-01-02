<template lang="pug">
  v-content
    v-container(fluid)
      v-list
        v-list-tile(@click='' v-for="(item, i) in words", :key='i')
          v-list-tile-content 
            v-list-tile-title {{ item.word }}
            v-list-tile-sub-title {{ item.translate || 'Перевода еще нет' }}
          v-list-tile-action
            v-btn(icon ripple @click="speak(item.word)")
              v-icon(light color='blue') volume_up
          v-list-tile-action
            v-btn(icon ripple @click="translate(item.word)")
              v-icon(light) translate
          v-list-tile-action
            v-btn(icon ripple)
              v-icon(light) playlist_add
      
</template>

<script>
  import axios from 'axios'
  import store from './../store'
  const API_URL = 'https://translate.yandex.net/api/v1.5/tr.json'
  const API_KEY = 'trnsl.1.1.20171130T120759Z.8231e8a635e67fbb.fee57266a0cdfa56496c1aed4fcbf8a9d50f72a8'

  export default {
    data () {
      return {
        words: []
      }
    },
    mounted: function () {
      store.dispatch('getWords').then(res => {
        console.log(res)
        this.words = res
      })
    },
    methods: {
      speak (word) {
        window.responsiveVoice.speak(word)
      },
      translate (word) {
        axios
          .get(`${API_URL}/translate?key=${API_KEY}&text=${word}&lang=en-ru&format=plain&options=1`)
          .then((res) => {
            console.log(res.data)
            this.words = this.words.map((item) => {
              if (word === item.word) {
                item.translate = res.data.text[0]
              }
              return item
            })
            console.log(this.words)
          })
      }
    }
  }
</script>
