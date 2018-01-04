<template lang="pug">
  v-content
    v-container(grid-list-lg fill-height)
      v-layout(row wrap)
        v-flex(xs12 sm12 md8 offset-md2 v-for="(article, i) in articles", :key="i")
          article-card(:article="article")
</template>

<script>
import ArticleCard from '@/components/ArticleCard'

export default {
  components: {
    ArticleCard
  },
  computed: {
    articles() {
      return this.$store.getters.articles
    }
  }
}
</script>
