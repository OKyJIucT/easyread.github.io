<template lang="pug">
  v-content
    v-container(fluid)
      v-list
        v-list-tile(@click='' v-for="(item, i) in words", :key='i')
          v-list-tile-content {{ item.word }}
          v-list-tile-action
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
    }
  }
</script>
