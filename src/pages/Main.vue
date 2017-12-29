<template lang="pug">
  v-content
    v-container
      v-layout(row wrap)
        v-flex(xs12 sm12 md8 offset-md2)
          v-radio-group(v-model="type" row)
            // v-radio(label="Link" value="link")
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
            @added="clearAndGoToArticles()"
            :isNew="true"
            :article="article")
</template>

<script>
  import _ from 'lodash'
  import { uuid } from 'vue-idb'
  import router from './../router'
  import ArticleCard from '@/components/ArticleCard'

  export default {
    data () {
      return {
        type: 'text',
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
    },
    components: {
      ArticleCard
    },
    methods: {
      clearAndGoToArticles() {
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
        router.push('./articles')
      },
      analyze () {
        this.isLoadingArticleCard = true
        const textArray = this.article.text
          .replace(/(?:\r\n|\r|\n)|—|-|:|,/g, '')
          .replace(/\./g, ' ')
          .replace(/\s\s+/g, ' ')
          .replace(/((\s*\S+)*)\s*/, '$1')
          .split(' ')
        this.article.wordsCount = textArray.length

        const sortUniq = _.uniq(textArray).filter(item => item.match(/^[a-zA-Z]+$/))
        this.uniqTextArray = sortUniq.filter(item => this.words.findIndex(t => t.word === item) < 0)
          .sort().map(item => ({id: uuid(), value: item}))

        this.article.uniqWordsCount = this.uniqTextArray.length
        this.isLoadingArticleCard = false
        this.isShowArticleCard = true
      }
    }
  }
</script>
