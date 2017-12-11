<template lang="pug">
  v-content
    v-container
      v-layout(row wrap)
        v-flex(xs12 sm12 md8 offset-md2)
          v-radio-group(v-model="type" row)
            v-radio(label="Link" value="link")
            v-radio(label="Text" value="text")
        
        v-flex(xs12 sm12 md8 offset-md2)
          div(v-if="type === 'link'")
            v-text-field(
              name="field-link" 
              label="Label Text"
              v-model="modelLink")

            v-btn(
              color="secondary" 
              :loading="loading" 
              @click.native="getOpenGraph()" 
              :disabled="loading") go
          
          div(v-if="type === 'text'")
            v-text-field(name="input-1" label="Label Text" textarea v-model="text")
            v-btn(color="secondary" :loading="loading" @click.native="analyze()" :disabled="loading") Analyze
            
        
    v-container(grid-list-lg)
      v-layout(row wrap)
        v-flex(xs12 sm12 md8 offset-md2 v-if="isOgLoading" class="text-xs-center")
          v-progress-circular(
            indeterminate 
            v-bind:size="120" 
            v-bind:width="3" 
            color="purple")
        v-flex(xs12 sm12 md8 offset-md2 v-if="og")
          v-card
            v-card-media(:src="og.ogImage.url" height="200px")
            v-card-title(primary-title)
              div
                h3(class="headline mb-0") {{ og.ogTitle}}
                div {{ og.ogDescription }}
            v-card-actions
              v-btn(flat color="orange") add to list
              v-btn(flat color="orange" @click.native="parse()") parse

        v-flex(xs12 sm12 md8 offset-md2 v-if="isWordsLoading" class="text-xs-center")
          v-progress-circular(
            indeterminate 
            v-bind:size="120" 
            v-bind:width="3" 
            color="purple")
        v-flex(xs12 sm12 md8 offset-md2 v-if="uniqTextArray.length")
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
  const API_URL = 'http://localhost:1488'

  export default {
    data () {
      return {
        type: 'link',
        text: null,
        link: null,
        uniqWordsCount: 0,
        uniqTextArray: [],
        words: [],
        modelLink: '',
        og: null,
        isOgLoading: false,
        isWordsLoading: false
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
        this.isWordsLoading = true
        axios.get(`${API_URL}/scraping/${encodeURIComponent(this.modelLink)}`)
          .then((res) => {
            console.log(res.data)
            this.uniqTextArray = res.data.uniq_text_array
            this.uniqWordsCount = res.data.uniq_words_count
            this.isWordsLoading = false
          }).catch((err) => {
            console.log(err)
          })
      },
      getOpenGraph () {
        this.isOgLoading = true
        axios.get(`${API_URL}/opengraph/${encodeURIComponent(this.modelLink)}`)
          .then((res) => {
            console.log(res)
            this.og = res.data.data
            this.isOgLoading = false
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
