<template lang="pug">
  v-app(light)
    v-navigation-drawer(fixed, :mini-variant='miniVariant', :clipped='clipped', v-model='drawer', app)
      v-list
        v-list-tile(avatar='', @click='')
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
    
    v-toolbar(fixed, app, :clipped-left='clipped')
      v-toolbar-side-icon(@click.stop='drawer = !drawer', light)
      v-toolbar-title(v-text='title')
    
    router-view

    v-footer(:fixed='fixed', app)
      span © 2017

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
        drawer: true,
        fixed: false,
        uniqTextArray: [],
        items: [
          {
            icon: 'bubble_chart',
            title: 'Main',
            route: '/'
          },
          {
            icon: 'bubble_chart',
            title: 'Words',
            route: 'words'
          },
          {
            icon: 'bubble_chart',
            title: 'Articles',
            route: 'articles'
          }
        ],
        miniVariant: false,
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
