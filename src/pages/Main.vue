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
              v-model="article.link")
            v-btn(
              color="secondary" 
              @click.native="getOpenGraph()") go
          div(v-if="type === 'text'")
            v-text-field(name="input-1" label="Label Text" textarea v-model="article.text")
            v-btn(color="secondary" @click.native="analyze()") Analyze
    v-container(grid-list-lg)
      v-layout(row wrap)
        v-flex(xs12 sm12 md8 offset-md2 v-if="isLoadingArticleCard" class="text-xs-center")
          v-progress-circular(
            indeterminate 
            v-bind:size="120" 
            v-bind:width="3" 
            color="purple")
        v-flex(xs12 sm12 md8 offset-md2 v-if="isShowArticleCard")
          article-card(
            @added="clear()"
            :isNew="true"
            :article="article")
</template>

<script>
  import _ from 'lodash'
  import { uuid } from 'vue-idb'
  import axios from 'axios'
  import ArticleCard from '@/components/ArticleCard'
  const API_URL = 'http://localhost:1488'

  export default {
    data () {
      return {
        type: 'link',
        uniqTextArray: [],
        words: [],
        isOgLoading: false,
        isWordsLoading: false,
        isShowArticleCard: false,
        isLoadingArticleCard: false,
        article: {
          img: null,
          link: null,
          title: null,
          text: null,
          wordsCount: 0,
          uniqWordsCount: 0
        }
      }
    },
    mounted() {
      this.$store.dispatch('updateLearnedWords')
    },
    components: {
      ArticleCard
    },
    methods: {
      clear() {
        this.article = {
          img: null,
          link: null,
          title: null,
          text: null,
          wordsCount: 0,
          uniqWordsCount: 0
        }
        this.isOgLoading = false
        this.isWordsLoading = false
        this.isShowArticleCard = false
        this.isLoadingArticleCard = false
      },
      parse () {
        this.isWordsLoading = true
        axios.get(`${API_URL}/scraping/${encodeURIComponent(this.article.link)}`)
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
        axios.get(`${API_URL}/opengraph/${encodeURIComponent(this.article.link)}`)
          .then((res) => {
            console.log(res)
            this.og = res.data.data
            this.isOgLoading = false
          }).catch((err) => {
            console.log(err)
          })
      },
      analyze () {
        this.isLoadingArticleCard = true

        const textArray = this.article.text.split(' ')
        const sortUniq = _.uniq(textArray).filter(item => item.match(/^[a-zA-Z]+$/))
        this.uniqTextArray = sortUniq.filter(item => this.words.findIndex(t => t.word === item) < 0)
          .sort().map(item => ({id: uuid(), word: item}))

        this.article.uniqWordsCount = this.uniqTextArray.length
        this.isLoadingArticleCard = false
        this.isShowArticleCard = true
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
