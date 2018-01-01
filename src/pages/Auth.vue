<template lang="pug">
  v-content.bg
    v-container(fill-height)
      v-flex(
        xs12 
        sm8 offset-sm2
        md6 offset-md3
        lg5 offset-lg3
        xl4 offset-xl4)
        v-toolbar(dark color="primary")
          v-toolbar-title.white--text Вход
              
        v-card
          v-container
            v-flex(class="mb-2" center)
              .headlinefont.text-xs-center Войти через
            v-layout(row wrap)
              v-flex(class="mb-2 pl-2 pr-2" sm6 xs12)
                v-btn(
                  @click.native="loginWithFacebook()"
                  :loading="loadingFacebook"
                  :disabled="loadingFacebook"
                  style="background-color: #45609B"
                  class="white--text ma-0 w-100") Facebook
              //- v-flex(class="mb-2 pl-2 pr-2" sm4 xs12)
              //-   v-btn(
              //-     :loading="loading3"
              //-     @click.native="loader = 'loading3'"
              //-     :disabled="loading3"
              //-     style="background-color: #4E6D92"
              //-     class="white--text ma-0 w-100") Вконтакте
              v-flex(class="mb-2 pl-2 pr-2" sm6 xs12)
                v-btn(
                  @click.native="loginWithGoogle()"
                  :loading="loadingGoogle"
                  :disabled="loadingGoogle"
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
                    prepend-icon="email"
                    :rules="emailRules"
                    required)
                v-flex(xs12 class="mb-2 pl-2 pr-2")
                  v-text-field(
                    label="Пароль"
                    v-model="password"
                    prepend-icon="lock"
                    :append-icon="visible ? 'visibility' : 'visibility_off'"
                    :append-icon-cb="() => (visible = !visible)"
                    :type="visible ? 'text' : 'password'"
                    :rules="passwordRules"
                    required)
                v-flex(class="mb-2" sm6 xs12 class="pl-2 pr-2")
                  v-btn(
                    @click.native="login()"
                    :loading="loadingLogin"
                    :disabled="loadingLogin"
                    color="primary"
                    class="white--text ma-0 w-100") Войти
                v-flex(class="mb-2" sm6 xs12 class="pl-2 pr-2")
                  router-link(to="registration")
                    v-btn(
                      color="grey lighten-3"
                      class="ma-0 w-100") Регистрация

</template>

<script>
  export default {
    data () {
      return {
        visible: false,
        loadingLogin: false,
        loadingGoogle: false,
        loadingFacebook: false,
        valid: false,
        password: 'qwerty',
        passwordRules: [
          (v) => !!v || 'Вы забыли ввести пароль',
          (v) => v.length <= 10 || 'password must be less than 10 characters'
        ],
        email: 'develop.gonzales@gmail.com',
        emailRules: [
          (v) => !!v || 'Вы забыли ввести e-mail'
          // (v) => emailRegexp.test(v) || 'E-mail must be valid'
        ]
      }
    },
    methods: {
      login() {
        this.loadingLogin = true
        this.$store.dispatch('login', {
          email: this.email,
          password: this.password
        }).then((res) => {
          this.loadingLogin = false
        })
      },
      loginWithFacebook() {
        this.loadingFacebook = true
        this.$store.dispatch('loginFacebook').then((res) => {
          this.loadingFacebook = false
        })
      },
      loginWithGoogle() {
        this.loadingGoogle = true
         this.$store.dispatch('loginGoogle').then((res) => {
          this.loadingGoogle = false
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