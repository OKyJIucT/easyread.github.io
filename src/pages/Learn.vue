<template lang="pug">
  v-content
    v-container(fluid style="height: 100%")
      v-layout(
        column
        style="height: 100%"
        align-center
        justify-center
        v-touch="detectSwipe")
        v-flex(style="display: flex" xs12, sm6, offset-sm3 align-center)
          v-card
            v-card-title(primary-title)
              div
                h3.headline.mb-0(v-if="activeWord") {{ activeWord.word }}
                v-btn(flat color="primary" @click="speak(activeWord.word)") Listen
                  v-icon(light color='blue') volume_up
            //- v-card-actions
            //-   v-btn(flat, color='orange') Share
            //-   v-btn(flat, color='orange') Explore
</template>

<script>
  export default {
    data () {
      return {
        words: [],
        toLearnWords: [],
        activeWord: null,
        swipeDirection: 'None',
        detectSwipe: {
          left: () => this.swipe('Left'),
          right: () => this.swipe('Right'),
          up: () => this.addToStudied(this.activeWord),
          down: () => this.addToStudy(this.activeWord)
        }
      }
    },
    mounted: function () {
      this.update()
    },
    methods: {
      update () {
        this.$db.words.toArray().then((words) => {
          this.words = words
        }).then((words) => {
          this.activeWord = this.words[0]
        }).catch((err) => {
          console.log(err)
        })
        this.$db.learnedWords.toArray().then((words) => {
          console.log(words)
        }).catch((err) => {
          console.log(err)
        })
      },
      swipe (direction) {
        this.swipeDirection = direction
      },
      speak (word) {
        window.responsiveVoice.speak(word)
      },
      addToStudied (word) {
        console.log('add to studied')
        this.$db.learnedWords.add({
          id: word.id,
          word: word.word,
          translate: '',
          learned: true
        }).then((id) => {
          this.$db.words.where('id').equals(id).delete().then(this.update).catch((err) => {
            console.log(err)
          })
        }).catch((err) => {
          console.log(err)
        })
      },
      addToStudy (word) {
        console.log('add to study')
        this.toLearnWords.push(word)
      }
    }
  }
</script>
