<template lang="pug">
  v-content
    v-container(fluid)
      v-flex(xs12 sm4 offset-sm4)
        v-card
          v-container(fluid)
            v-form(v-model="valid")
              v-text-field(
                label="E-mail"
                v-model="email"
                :rules="emailRules"
                required)
              v-text-field(
                label="Password"
                v-model="password"
                :rules="passwordRules"
                required)

              v-container(grid-list-xs)
                v-layout(column)
                  v-flex(class="mb-4" xs-12)
                    v-btn(
                      :loading="loading1"
                      @click.native="login()"
                      :disabled="loading1"
                      color="light-green"
                      class="white--text ma-0 w-100") Login
                  v-flex(class="mb-2")
                    v-btn(
                      :loading="loading2"
                      @click.native="loader = 'loading2'"
                      :disabled="loading2"
                      color="light-blue darken-4"
                      class="white--text ma-0 w-100") Facebook
                  v-flex(class="mb-2")
                    v-btn(
                      :loading="loading3"
                      @click.native="loader = 'loading3'"
                      :disabled="loading3"
                      color="blue darken-1"
                      class="white--text ma-0 w-100") Vkontakte

</template>

<script>
  export default {
    data () {
      return {
        loader: null,
        loading1: false,
        loading2: false,
        loading3: false,
        valid: false,
        password: '',
        passwordRules: [
          (v) => !!v || 'password is required',
          (v) => v.length <= 10 || 'password must be less than 10 characters'
        ],
        email: '',
        emailRules: [
          (v) => !!v || 'E-mail is required'
          // (v) => emailRegexp.test(v) || 'E-mail must be valid'
        ]
      }
    },
    watch: {
      loader () {
        const l = this.loader
        this[l] = !this[l]

        setTimeout(() => (this[l] = false), 3000)

        this.loader = null
      }
    },
    methods: {
      login () {
        this.loader = 'loading1'
        this.$store.dispatch('login', {
          email: this.email,
          password: this.password
        }).then(() => {
          this.$router.push('/')
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>

  .w-100
    width 100%

</style>