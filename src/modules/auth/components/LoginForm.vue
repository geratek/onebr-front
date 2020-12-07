<template>
  <v-form
    lazy-validation
    ref="form"
    class="login-form"
    @submit.prevent="submit()"
  >
    <v-text-field
      outlined
      rounded
      required
      name="userName"
      type="email"
      hide-details="auto"
      class="email-text-field"
      v-model="form.username"
      :rules="[required]"
      :placeholder="$t('auth.form.labels.login')"
    />
    <v-text-field
      outlined
      rounded
      required
      name="password"
      type="password"
      hide-details="auto"
      class="password-text-field"
      v-model="form.password"
      :rules="[required]"
      :placeholder="$t('auth.form.labels.password')"
    />
    <primary-button
      invert
      block
      type="submit"
      class="mt-2"
    >
      {{ $t('auth.form.actions.submit') }}
    </primary-button>
  </v-form>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

import BasicCredentials from '@/modules/shared/entities/BasicCredentials'

import PrimaryButton from '@/modules/shared/components/PrimaryButton.vue'
import ValidatorMixin from '@/modules/shared/mixins/ValidatorMixin'

const authModule = namespace('auth')

@Component({
  components: {
    PrimaryButton,
  },
})
export default class LoginForm extends Mixins(ValidatorMixin) {
  @authModule.Action
  private readonly login!: (credentials: BasicCredentials) => Promise<void>

  private form = new BasicCredentials()

  async submit(): Promise<void> {
    const { redirect = '/admin' } = this.$route.query

    if (!this.validate()) return

    try {
      await this.login(this.form)

      this.$router.replace({
        path: redirect as string,
      })
    } catch (err) {
      // TODO: handle this error
    }
  }
}
</script>

<style lang="scss" scoped>
.login-form {
  margin: 25px 0 32px;
  max-width: 460px;
  width: 100%;

  @media #{map-get($display-breakpoints, 'md-and-up')} {
    margin: 92px 0 36px;
  }

  .email-text-field:not(.error--text) {
    margin-bottom: 16px;

    @media #{map-get($display-breakpoints, 'md-and-up')} {
      margin-bottom: 20px;
    }
  }

  .password-text-field:not(.error--text) {
    margin-bottom: 24px;

    @media #{map-get($display-breakpoints, 'md-and-up')} {
      margin-bottom: 40px;
    }
  }
}
</style>
