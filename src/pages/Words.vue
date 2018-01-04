<template lang="pug">
  v-content
    v-container(fluid)
      v-list
        v-list-tile(v-for="(item, i) in words" :key='i')
          v-list-tile-content 
            v-list-tile-title {{ item.word }}
            v-list-tile-sub-title {{ item.translate || 'Перевода еще нет' }}
          v-list-tile-action
            v-btn(icon ripple @click="speak(item.word)")
              v-icon(light color='blue') volume_up
</template>

<script>
export default {
  computed: {
    words() {
      return this.$store.getters.learnedWords
    }
  },
  methods: {
    speak (word) {
      window.responsiveVoice.speak(word)
    }
  }
}
</script>
