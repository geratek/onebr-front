<template>
  <div class="login-page">
    <div class="d-flex flex-column align-center pt-3">
      <headline :title="$t('auth.headline')" />

      <login-form />

      <recover-password />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import Headline from '@/modules/shared/components/Headline.vue'
import LoginForm from '../components/LoginForm.vue'
import RecoverPassword from '../components/RecoverPassword.vue'

@Component({
  components: {
    Headline,
    LoginForm,
    RecoverPassword,
  },
})
export default class Login extends Vue {}
</script>

<style lang="scss" scoped>
.login-page {
  padding-left: 48px;
  padding-right: 48px;

  @media #{map-get($display-breakpoints, 'md-and-up')} {
    background-image: url(../../../assets/login_bg.png);
  }
}
</style>
