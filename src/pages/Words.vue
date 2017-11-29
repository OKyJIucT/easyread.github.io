<template lang="pug">
  v-content
    v-container(fluid)
      v-list
        v-list-tile(@click='' v-for="(item, i) in words", :key='i')
          v-list-tile-content 
            v-list-tile-title {{ item.word }}
            v-list-tile-sub-title Перевод
          v-list-tile-action
            v-btn(icon ripple @click="speak(item.word)")
              v-icon(light) volume_up
          v-list-tile-action
            v-btn(icon ripple)
              v-icon(light) playlist_add
      
</template>

<script>
  export default {
    data () {
      return {
        words: []
      }
    },
    mounted: function () {
      this.$db.words.toArray().then((words) => {
        console.log(words)
        this.words = words
      })
    },
    methods: {
      speak (word) {
        window.responsiveVoice.speak(word)
      }
    }
  }
</script>
