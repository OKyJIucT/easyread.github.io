<template lang="pug">
  v-content
    v-container(fluid)
      v-text-field(name="input-1" label="Label Text" textarea v-model="text")
      v-btn(color="secondary" :loading="loading" @click.native="analyze()" :disabled="loading") Analyze
      | Uniq words count {{ uniqWordsCount }}
      v-btn(color="secondary" @click.native="addTolocalDB()") ADD TO LOCAL DB
      v-btn(color="secondary" @click.native="getFromlocalDB()") GET FROM LOCAL DB
      v-btn(color="secondary" @click.native="getKeysInStorage()") GET KEYS FROM LOCAL DB
      
      v-list
        v-list-tile(@click='add(item)' v-for="(item, i) in uniqTextArray", :key='i')
          v-list-tile-content {{ item.word }}
          v-list-tile-action
            v-icon(light) playlist_add

</template>

<script>
  import _ from 'lodash'
  // import { uuid } from 'vue-idb'

  export default {
    data () {
      return {
        text: null,
        link: null,
        uniqWordsCount: 0,
        loader: null,
        loading: false,
        uniqTextArray: [],
        words: []
      }
    },
    mounted: function () {
      this.update()
    },
    methods: {
      update () {
        this.$db.words.toArray().then((words) => {
          console.log(words)
          this.words = words
        })
      },
      analyze () {
        // this.loading = true
        const textArray = this.text.split(' ')
        const sortUniq = _.uniq(textArray).filter((item) => {
          return item.match(/^[a-zA-Z]+$/)
        })
        this.uniqTextArray = sortUniq.map((item, index) => {
          const findedWord = this.words.find(word => word.id === index)
          if (findedWord) {
            return
          }
          item = {
            id: index,
            word: item
          }
          return item
        }).filter(Boolean).sort()
        console.log(this.uniqTextArray)
        console.log(this.uniqTextArray.sort())
        this.uniqWordsCount = this.uniqTextArray.length
      },
      add (word) {
        console.log(word)
        this.$db.words.add({
          id: word.id,
          word: word.word
        }).then(() => {
          this.update()
        })
      }
    }
  }
</script>
