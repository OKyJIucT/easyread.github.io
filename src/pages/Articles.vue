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
        
        v-flex(xs12 sm12 md8 offset-md2 v-for="(item, i) in articles", :key="i")
          article-card(
            :article="item"
            :img="item.img"
            :title="item.title"
            :description="item.description"
            :wordsCount="item.wordsCount",
            :uniqWordsCount="item.uniqWordsCount")
         

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
      this.$store.subscribe((mutation, state) => {
        if (mutation.type === 'UPDATE_ARTICLES') {
          console.log('mutation.type ===>>> ', mutation.type)
          console.log('state.articles ===>>> ', state.articles)
          this.articles = state.articles
        }
      })
      this.$db.articles.toArray().then((articles) => {
        console.log(articles)
        this.articles = articles
      }).catch((err) => {
        console.log(err)
      })
    }
  }
</script>
