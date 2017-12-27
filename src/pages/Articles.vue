<template lang="pug">
  v-content
    v-container(grid-list-lg)
      v-layout(row wrap)
        v-flex(xs12 sm12 md8 offset-md2 v-if="isOgLoading" class="text-xs-center")
          v-progress-circular(
            indeterminate 
            v-bind:size="120" 
            v-bind:width="3" 
            color="purple")
        
        v-flex(xs12 sm12 md8 offset-md2 v-for="(article, i) in articles", :key="i")
          article-card(:article="article")
</template>

<script>
  import ArticleCard from '@/components/ArticleCard'
  
  export default {
    components: {
      ArticleCard
    },
    data() {
      return {
        articles: [],
        isOgLoading: false
      }
    },
    mounted() {
      this.$store.dispatch('getUserArticles').then((articles) => {
        this.articles = articles
        console.log(articles)
      }).catch(console.log)
      this.$store.subscribe((mutation, state) => {
        if (mutation.type === 'UPDATE_ARTICLES') {
          this.articles = state.articles
        }
      })
    }
  }
</script>
