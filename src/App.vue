<template lang="pug">
  v-app(light)
    v-navigation-drawer(fixed :clipped='clipped' v-model='drawer' app)
      v-list
        v-list-tile(avatar='' @click='')
          v-list-tile-avatar
            v-icon account_circle
          v-list-tile-content
            v-list-tile-title Pavel Gnzales
            v-list-tile-sub-title Premium 
          v-list-tile-action
            v-btn(icon='', ripple='')
              v-icon(color='grey lighten-1') more_vert

        router-link(v-for='(item, i) in items', :key='i', :to="item.route")
          v-list-tile(value='true', exact @click='')
            v-list-tile-action
              v-icon(light, v-html='item.icon')
            v-list-tile-content
              v-list-tile-title(v-text='item.title')
    
    v-toolbar(fixed app :clipped-left='clipped'  dark color="primary")
      v-toolbar-side-icon(@click.stop='drawer = !drawer', dark)
      v-toolbar-title(v-text='title')
    
    router-view

    v-footer(:fixed='fixed', app)
      span © 2017&nbsp;
      a(href="https://github.com/PavelGonzales" target="_blank") Pavel Gonzales

</template>

<script>
  export default {
    data () {
      return {
        text: null,
        link: null,
        uniqWordsCount: 0,
        loader: null,
        loading: false,
        clipped: false,
        drawer: false,
        fixed: false,
        uniqTextArray: [],
        items: [
          {
            icon: 'home',
            title: 'Main',
            route: '/'
          },
          {
            icon: 'playlist_add_check',
            title: 'Words',
            route: 'words'
          }
          // {
          //   icon: 'bubble_chart',
          //   title: 'Articles',
          //   route: 'articles'
          // }
        ],
        right: true,
        rightDrawer: false,
        title: 'Translater'
      }
    },
    mounted: function () {
      window.responsiveVoice.setDefaultVoice('US English Female')
    }
  }
</script>

<style lang="stylus">

  a 
    text-decoration none

</style>