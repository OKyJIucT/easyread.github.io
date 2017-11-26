<template lang="pug">
  v-content
    v-container(fluid)
      v-text-field(name="input-1" label="Label Text" textarea v-model="text")
      v-btn(color="secondary" :loading="loading" @click.native="analyze()" :disabled="loading") Analyze
      | Uniq words count {{ uniqWordsCount }}
      v-btn(color="secondary" @click.native="addTolocalDB()") ADD TO LOCAL DB
      v-btn(color="secondary" @click.native="getFromlocalDB()") GET FROM LOCAL DB
      v-btn(color="secondary" @click.native="getKeysInStorage()") GET KEYS FROM LOCAL DB
      
      v-list
        v-list-tile(@click='' v-for="(item, i) in uniqTextArray", :key='i')
          v-list-tile-content
            v-list-tile-title {{ item.word }}

</template>

<script>
  import _ from 'lodash'

  export default {
    data () {
      return {
        text: null,
        link: null,
        uniqWordsCount: 0,
        loader: null,
        loading: false,
        uniqTextArray: []
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
