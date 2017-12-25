<template lang="pug">
  v-content.bg
    v-container(fill-height)
      v-flex(xs12 sm8 md6 lg5 offset-lg3 offset-md3 offset-sm2)
        v-toolbar(dark color="primary")
          v-toolbar-title.white--text Регистрация
              
        v-card
          v-container
            v-flex(class="mb-2" center)
              .headlinefont.text-xs-center Регистрация через
            v-layout(row wrap)
              v-flex(class="mb-2 pl-2 pr-2" xs12 sm4)
                v-btn(
                  :loading="loading2"
                  @click.native="loader = 'loading2'"
                  :disabled="loading2"
                  style="background-color: #45609B"
                  class="white--text ma-0 w-100") Facebook
              v-flex(class="mb-2 pl-2 pr-2" xs12 sm4)
                v-btn(
                  :loading="loading3"
                  @click.native="loader = 'loading3'"
                  :disabled="loading3"
                  style="background-color: #4E6D92"
                  class="white--text ma-0 w-100") Вконтакте
              v-flex(class="mb-2 pl-2 pr-2" xs12 sm4)
                v-btn(
                  :loading="loading4"
                  @click.native="loader = 'loading4'"
                  :disabled="loading4"
                  style="background-color: #E15547"
                  class="white--text ma-0 w-100") Google
            v-flex(class="mt-3" center)
              .headlinefont.text-xs-center или
            v-form(v-model="valid")
              v-layout(row wrap)
                v-flex(xs12 class="pl-2 pr-2")
                  v-text-field(
                    label="E-mail"
                    v-model="email"
                    :rules="emailRules"
                    required)
                v-flex(xs12 class="mb-2 pl-2 pr-2")
                  v-text-field(
                    label="Пароль"
                    v-model="password"
                    :rules="passwordRules"
                    required)
                v-flex(xs12 class="mb-2 pl-2 pr-2")
                  v-text-field(
                    label="Повторите пароль"
                    v-model="confirmPassword"
                    :rules="passwordRules"
                    required)
                v-flex(xs12 class="mb-2 pl-2 pr-2")
                  v-checkbox(
                    label="Я согласен со всеми правилами"
                    v-model="agree"
                    :rules="[v => !!v || 'Вы должны подтвердить согласие!']"
                    required)
                v-flex(class="mb-2" sm6 xs12 class="pl-2 pr-2")
                  v-btn(
                    color="grey lighten-3"
                    @click.native="registration()"
                    class="ma-0 w-100") Регистрация
                v-flex(class="mb-2" sm6 xs12 class="pl-2 pr-2")
                  router-link(to="auth")
                    v-btn(
                      :loading="loading1"
                      :disabled="loading1"
                      color="primary"
                      class="white--text ma-0 w-100") Войти

</template>

<script>
export default {
  data () {
    return {
      agree: false,
      loader: null,
      loading1: false,
      loading2: false,
      loading3: false,
      loading4: false,
      valid: false,
      password: '',
      confirmPassword: '',
      passwordRules: [
        (v) => !!v || 'Вы забыли ввести пароль',
        (v) => v.length <= 10 || 'password must be less than 10 characters'
      ],
      email: '',
      emailRules: [
        (v) => !!v || 'Вы забыли ввести e-mail'
        // (v) => emailRegexp.test(v) || 'E-mail must be valid'
      ]
    }
  },
  watch: {
    loader() {
      const l = this.loader
      this[l] = !this[l]

      setTimeout(() => (this[l] = false), 3000)

      this.loader = null
    }
  },
  methods: {
    registration() {
      this.loader = 'loading1'
      this.$store.dispatch('registration', {
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

.bg 
  background-size cover
  background-repeat no-repeat
  background-position center center
  background-image url('./../../static/1.png')
.w-100
  width 100%

</style>