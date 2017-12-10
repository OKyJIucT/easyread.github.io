<template lang="pug">
  v-content
    v-container(fluid)
      v-radio-group(v-model="type" row)
        v-radio(label="Link" value="link")
        v-radio(label="Text" value="text")
      v-text-field(v-if="type === 'link'" name="input-1" label="Label Text" id="testing" v-model="modelLink")
      v-btn(v-if="type === 'link'" color="secondary" :loading="loading" @click.native="parse()" :disabled="loading") Parse
      v-text-field(v-if="type === 'text'" name="input-1" label="Label Text" textarea v-model="text")
      v-btn(v-if="type === 'text'" color="secondary" :loading="loading" @click.native="analyze()" :disabled="loading") Analyze
      | Uniq words count {{ uniqWordsCount }}

      v-list
        v-list-tile(@click='add(item, i)' v-for="(item, i) in uniqTextArray", :key='i')
          v-list-tile-content {{ item.word }}
          v-list-tile-action
            v-icon(light) playlist_add

</template>

<script>
  import _ from 'lodash'
  import { uuid } from 'vue-idb'
  import axios from 'axios'
  const API_URL = 'http://localhost:3003'

  export default {
    data () {
      return {
        type: 'link',
        text: null,
        link: null,
        uniqWordsCount: 0,
        loader: null,
        loading: false,
        uniqTextArray: [],
        words: [],
        modelLink: ''
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
      parse () {
        axios.get(`${API_URL}/scraping/${encodeURIComponent(this.modelLink)}`)
          .then((res) => {
            console.log(res)
          }).catch((err) => {
            console.log(err)
          })
      },
      analyze () {
        // this.loading = true
        const textArray = this.text.split(' ')
        const sortUniq = _.uniq(textArray).filter((item) => {
          return item.match(/^[a-zA-Z]+$/)
        })
        this.uniqTextArray = sortUniq.filter(item => this.words.findIndex(t => t.word === item) < 0)
          .sort().map(item => ({id: uuid(), word: item}))
        console.log(this.uniqTextArray)
        this.uniqWordsCount = this.uniqTextArray.length
      },
      add (word, index) {
        console.log(word)
        this.uniqTextArray.splice(index, 1)
        this.$db.words.add({
          id: word.id,
          word: word.word,
          translate: ''
        }).then(() => {
          this.update()
        })
      }
    }
  }
</script>
