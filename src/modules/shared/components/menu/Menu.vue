<template>
  <v-sheet id="navigation" elevation="4" tag="nav">
    <v-btn
      icon
      class="close-button"
      color="primary"
      :large="isDesktop"
      :small="isMobile"
      @click="close()"
    >
      <icon :large="isDesktop" name="close" />
    </v-btn>

    <div class="d-flex justify-center mb-3" v-if="isMobile">
      <profile-button @click.native="close()"/>

      <locale-changer />
    </div>

    <v-container :fill-height="isDesktop">
      <v-row>
        <v-col
          v-for="(item, index) in menuItems"
          :key="index"
          :cols="isMobile ? 12 : false"
        >
          <menu-item
            :title="item.title"
            :subtitle="item.subtitle"
            :to="item.to"
            @click.native="close()"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import LocaleChanger from '@/modules/shared/components/LocaleChanger.vue'
import ProfileButton from '@/modules/shared/components/ProfileButton.vue'

import Icon from '../Icon.vue'
import MenuItem from './MenuItem.vue'

@Component({
  components: {
    Icon,
    LocaleChanger,
    MenuItem,
    ProfileButton,
  },
})
export default class Menu extends Vue {
  private get menuItems() {
    return [
      {
        title: this.$t('shared.menu.1.title'),
        subtitle: this.$t('shared.menu.1.text'),
        to: { name: 'team' },
      },
      {
        title: this.$t('shared.menu.2.title'),
        subtitle: this.$t('shared.menu.2.text'),
        to: { name: 'contributors' },
      },
      {
        title: this.$t('shared.menu.3.title'),
        subtitle: this.$t('shared.menu.3.text'),
        to: { name: 'publications' },
      },
      {
        title: this.$t('shared.menu.4.title'),
        subtitle: this.$t('shared.menu.4.text'),
        to: { name: 'contact' },
      },
    ]
  }

  private get isMobile(): boolean {
    return this.$vuetify.breakpoint.smAndDown
  }

  private get isDesktop(): boolean {
    return !this.isMobile
  }

  private close() {
    this.$emit('close')
  }
}
</script>

<style lang="scss" scoped>
@import '~vuetify/src/styles/styles.sass';

#navigation {
  padding: 32px 0 60px;

  .close-button {
    margin-left: 44px;
  }

  @media #{map-get($display-breakpoints, 'sm-and-down')} {
    height: 100%;
    overflow-y: auto;
    padding: 80px 24px 35px;

    .close-button {
      left: 24px;
      margin-left: 0;
      position: absolute;
      top: 24px;
    }
  }
}
</style>
