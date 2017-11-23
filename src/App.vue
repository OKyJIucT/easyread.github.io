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

       
        v-list-tile(value='true', v-for='(item, i) in items', :key='i', exact @click='')
          v-list-tile-action
            v-icon(light, v-html='item.icon')
          v-list-tile-content
            v-list-tile-title(v-text='item.title')
    
    v-toolbar(fixed, app, :clipped-left='clipped')
      v-toolbar-side-icon(@click.stop='drawer = !drawer', light)
      v-toolbar-title(v-text='title')
    
    v-content
      v-container(fluid)
        v-text-field(name="input-1" label="Label Text" textarea v-model="text")
        v-btn(color="secondary" :loading="loading" @click.native="analyze()" :disabled="loading") Analyze
        | Uniq words count {{ uniqWordsCount }}
        v-btn(color="secondary" @click.native="addTolocalDB()") ADD TO LOCAL DB
        v-btn(color="secondary" @click.native="getFromlocalDB()") GET FROM LOCAL DB
        v-btn(color="secondary" @click.native="getKeysInStorage()") GET KEYS FROM LOCAL DB
        
        

        v-list
          v-list-tile(@click='' v-for="item in uniqTextArray")
            v-list-tile-content
              v-list-tile-title {{ item.word }}

    v-footer(:fixed='fixed', app)
      span © 2017

</template>

<script>
  import _ from 'lodash'

  export default {
    data () {
      return {
        text: null,
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
            title: 'Words'
          },
          {
            icon: 'bubble_chart',
            title: 'Articles'
          }
        ],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'Translater'
      }
    },
    methods: {
      analyze () {
        // this.loading = true
        const textArray = this.text.split(' ')
        const sortUniq = _.uniq(textArray).filter((item) => {
          return item.match(/^[a-zA-Z]+$/)
        })
        // this.uniqTextArray = sortUniq.sort()
        this.uniqTextArray = sortUniq.map((item, index) => {
          item = {
            id: index,
            word: item
          }
          return item
        }).sort()
        this.uniqWordsCount = this.uniqTextArray.length
      },
      addTolocalDB () {
        this.$setItem('uniqTextArray', this.uniqTextArray).then((res) => {
          console.log('res', res)
        })
      },
      getFromlocalDB () {
        this.$getItem('uniqTextArray').then((res) => {
          console.log('Pick from local DB', res)
        })
      },
      getKeysInStorage () {
        this.$keysInStorage().then((res) => {
          console.log('Pick all keys in storage', res)
        })
      }
    }
  }
</script>
