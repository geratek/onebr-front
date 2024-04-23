<template>
  <section class="contact-address">
    <h2 class="body-1 contact-address__title">
      {{ $t('contact.find_us') }}
    </h2>
    <address class="caption contact-address__address">
      <strong class="d-block">
        {{ $t('shared.footer.address.line.1') }}
      </strong>
      {{ $t('shared.footer.address.line.2') }} <br />
      {{ $t('shared.footer.address.line.3') }} <br />
      <strong>Instagram One Health BR</strong> - Aqui divulgamos as publicações produzidas pelo laboratório de forma intuitiva e divertida, criamos uma ponte entre a bacteriologia e o dia-a-dia, e muito mais! <br />
      <a
        class="grey--text text--darken-1"
        href="https://www.instagram.com/onehealthbr/"
        style="text-decoration: underline;"
        target="_blank"
      >Clica aqui</a> para nos seguir!
    </address>
    <v-img
      src="@/assets/contact_attendant.png"
      alt="Imagem atendente"
      width="100%"
      max-width="370"
      class="mx-auto"
    />
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class ContactAddress extends Vue {}
</script>

<style lang="scss" scoped>
.contact-address {
  &__title {
    font-size: 16px !important;
  }

  &__address {
    font-size: 12px !important;
    margin: 20px 0 26px;

    @media #{map-get($display-breakpoints, 'md-and-up')} {
      margin-bottom: 98px;
    }
  }
}
</style>
