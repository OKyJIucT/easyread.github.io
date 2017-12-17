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
        
        // OG CARD =========================================================
        v-flex(xs12 sm12 md8 offset-md2 v-for="(item, i) in articles", :key="i")
          v-card
            v-card-media(:src="item.image" height="200px")
            v-card-title(primary-title)
              div
                h3(class="headline mb-0") {{ item.name }}
                div {{ item.description ? item.description.substring(0, 25) + '...' : '' }}
            v-card-actions
              v-btn(flat color="orange") add to list
              v-btn(flat color="orange") parse


</template>

<script>
  export default {
    data () {
      return {
        articles: [],
        isOgLoading: false
      }
    },
    mounted: function () {
      this.$db.articles.toArray().then((articles) => {
        console.log(articles)
        this.articles = articles
      }).catch((err) => {
        console.log(err)
      })
    }
  }
</script>
