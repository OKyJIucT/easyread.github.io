<template lang="pug">
  v-content
    v-container(grid-list-lg fill-height)
      v-layout(row wrap)
        v-flex(xs12 sm12 md8 offset-md2 v-if="isLoading" class="text-xs-center")
          v-progress-circular(
            class="align"
            indeterminate 
            v-bind:size="120" 
            v-bind:width="3" 
            color="purple")
          
        v-flex(xs12 sm12 md8 offset-md2 v-for="(article, i) in articles", :key="i")
          article-card(:article="article" @remove="updateArticles()")
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
        isLoading: true
      }
    },
    mounted() {
      this.updateArticles()
    },
    methods: {
      updateArticles() {
        this.$store.dispatch('getUserArticles').then((articles) => {
        this.articles = articles
        this.isLoading = false
      }).catch(console.log)
      }
    }
  }
</script>
<style scoped lang="stylus">
.align
  top 50%
  transform translateY(-50%)
</style>