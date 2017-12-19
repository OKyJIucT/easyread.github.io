<template lang="pug">
  v-app(light :class="{ unauth: !isLoggedIn }")
    v-navigation-drawer(fixed :clipped='clipped' v-model='drawer' app  v-if='isLoggedIn')
      v-card-media(src='/static/img/cap.png', height='200px')
        .black-overlay
        v-container(fill-height fluid style="margin-top: auto; position: relative")
          v-layout(fill-height align-end)
            v-flex(xs12 flexbox)
              v-avatar.indigo(style="margin-bottom: 10px")
                v-icon(dark) account_circle
                
              div.title.grey--text.text--lighten-4 Pavel Gonzales
              div.subheading.grey--text.text--lighten-4 Супер-юзер

      v-list
        router-link(v-for='(item, i) in items', :key='i', :to="item.route")
          v-list-tile(value='true', exact @click='')
            v-list-tile-action
              v-icon(light, v-html='item.icon')
            v-list-tile-content
              v-list-tile-title(v-text='item.title')
        v-list-tile(value='true', exact @click='logout')
          v-list-tile-action
            v-icon(light) exit_to_app
          v-list-tile-content
            v-list-tile-title Выйти
    
    v-toolbar(fixed app :clipped-left='clipped'  dark color="primary" v-if='isLoggedIn')
      v-toolbar-side-icon(@click.stop='drawer = !drawer', dark)
      v-toolbar-title(v-text='title')
    
    router-view

    v-footer(:fixed='fixed', app)
      span © 2017&nbsp;
      a(href="https://github.com/PavelGonzales" target="_blank") Pavel Gonzales

</template>

<script>
  import router from './router'

  export default {
    data () {
      return {
        text: null,
        link: null,
        loader: null,
        clipped: false,
        drawer: false,
        fixed: false,
        uniqTextArray: [],
        items: [
          {
            icon: 'home',
            title: 'Главная',
            route: '/'
          },
          {
            icon: 'playlist_add_check',
            title: 'Слова',
            route: 'words'
          },
          {
            icon: 'book',
            title: 'Статьи / тексты',
            route: 'articles'
          },
          {
            icon: 'extension',
            title: 'Обучение',
            route: 'learn'
          }
        ],
        right: true,
        rightDrawer: false,
        title: 'Учимся по статьям'
      }
    },
    mounted: function () {
      window.responsiveVoice.setDefaultVoice('US English Female')
      console.log('DB ===>>>>', this.$db)
    },
    created () {
      console.log('isLoggedIn ===>>>>', this.isLoggedIn)
    },
    computed: {
      isLoggedIn () {
        return this.$store.getters.isLoggedIn
      }
    },
    methods: {
      logout () {
        this.$store.dispatch('logout').then((res) => {
          router.push('./auth')
        })
      }
    }
  }
</script>

<style lang="stylus">

.unauth 
  background: #69BD50 !important
  background: -moz-linear-gradient(45deg, #69BD50 0%, #69bd50 100%) !important
  background: -webkit-linear-gradient(45deg, #69BD50 0%,#69bd50 100%) !important
  background: linear-gradient(45deg, #69BD50 0%,#69bd50 100%) !important
a 
  text-decoration none

.black-overlay
  position absolute
  width 100%
  height 100%
  &:after
    content ''
    display block
    position absolute
    top 0
    left 0
    right 0
    bottom 0
    background-color rgba(0,0,0,0.35)
</style>