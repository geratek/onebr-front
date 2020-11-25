<template>
  <v-app-bar
    app
    class="app-bar white"
    elevation="1"
    :height="isMobile ? 72 : 100"
  >
    <template v-if="restrictedArea">
      <strong class="primary--text font-weight-bold ml-n1">
        <icon
          outlined
          name="settings"
          color="primary"
          left
        />
        {{ $t('shared.administrative_area') }}
      </strong>

      <v-spacer />

      <v-btn text exact class="mr-4" :to="{ name: 'home' }">
        <home-icon class="mr-3"/>
        {{ $t('shared.view_site') }}
      </v-btn>
    </template>

    <template v-else>
      <menu-dialog v-model="menu">
        <template v-slot="{ on }">
          <v-app-bar-nav-icon
            color="primary"
            :large="isDesktop"
            v-on="on"
          />
        </template>
      </menu-dialog>

      <v-spacer />

      <router-link class="app-bar__logo" to="/">
        <img v-if="isMobile" src="@/assets/logo-mobile.svg"/>
        <img v-else src="@/assets/logo.svg"/>
      </router-link>
    </template>

    <template v-if="isDesktop">
      <profile-button />

      <locale-changer />
    </template>
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import HomeIcon from '@/modules/shared/components/icons/HomeIcon.vue'
import Icon from '@/modules/shared/components/Icon.vue'
import LocaleChanger from '@/modules/shared/components/LocaleChanger.vue'
import MenuDialog from '@/modules/shared/components/menu/MenuDialog.vue'
import ProfileButton from '@/modules/shared/components/ProfileButton.vue'

@Component({
  components: {
    HomeIcon,
    Icon,
    LocaleChanger,
    MenuDialog,
    ProfileButton,
  },
})
export default class AppBar extends Vue {
  private menu = false;

  private get restrictedArea() {
    return this.$route.matched.some((record) => record.meta.auth)
  }

  private get isMobile(): boolean {
    return this.$vuetify.breakpoint.smAndDown
  }

  private get isDesktop(): boolean {
    return !this.isMobile
  }
}
</script>

<style lang="scss" scoped>
@import '~vuetify/src/styles/styles.sass';

.app-bar {
  padding: 0 40px;

  @media #{map-get($display-breakpoints, 'sm-and-down')} {
    padding: 0 8px;
  }

  &__logo {
    height: 62px;
    left: 50%;
    position: absolute;
    transform: translateX(-50%);

    @media #{map-get($display-breakpoints, 'sm-and-down')} {
      height: 40px;
    }

    img {
      height: 100%;
    }
  }
}
</style>
