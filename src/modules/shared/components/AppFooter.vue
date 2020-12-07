<template>
  <v-footer
    class="footer"
    v-if="!restrictedArea"
    :height="isMobile ? 'auto' : 268"
  >
    <v-container fluid align-end fill-height pb-12 px-7 px-md-12>
      <v-row no-gutters>
        <v-col :cols="isMobile ? 12 : false">
          <h2 class="title primary--text font-weight-bold mb-2">
            {{ $t('shared.footer.by') }}
          </h2>
          <v-img
            src="@/assets/lincopan.png"
            alt="Lincopan lab"
            :width="isMobile ? 239 : 362"
          />
        </v-col>
        <v-col :cols="isMobile ? 12 : false" class="text-md-right">
          <nav class="body-1 font-weight-bold">
            <router-link
              v-for="(item, index) in menuItems"
              :key="index"
              :to="item.to"
            >
              {{ item.title }}
            </router-link>
          </nav>
          <address class="body-2">
            <strong class="d-block">
              {{ $t('shared.footer.address.line.1') }}
            </strong>
            {{ $t('shared.footer.address.line.2') }} <br />
            {{ $t('shared.footer.address.line.3') }}
          </address>
          <small class="caption grey--text text--darken-1">
            <span v-html="$t('shared.copyright')"></span>
            <a
              class="grey--text text--darken-1"
              href="https://www.geratek.com.br/home/"
              style="text-decoration: underline;"
              target="_blank"
            >
              geraTek
            </a>
          </small>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'

import { ViewDataScope } from '@/modules/shared/entities/ViewData'

import ViewDataMixin from '@/modules/shared/mixins/ViewDataMixin'

@Component
export default class AppFooter extends Mixins(ViewDataMixin) {
  viewDataScope = ViewDataScope.footer

  private get restrictedArea() {
    return this.$route.matched.some((record) => record.meta.auth)
  }

  private get menuItems() {
    return [
      {
        title: this.$t('shared.menu.1.title'),
        to: { name: 'team' },
      },
      {
        title: this.$t('shared.menu.2.title'),
        to: { name: 'contributors' },
      },
      {
        title: this.$t('shared.menu.3.title'),
        to: { name: 'publications' },
      },
      {
        title: this.$t('shared.menu.4.title'),
        to: { name: 'contact' },
      },
    ]
  }

  private get isMobile(): boolean {
    return this.$vuetify.breakpoint.smAndDown
  }
}
</script>

<style lang="scss" scoped>
.footer {
  background-color: white !important;
  padding: 82px 0 0;
  background-position: center center;
  background-size: 100% 100%;

  @media #{map-get($display-breakpoints, 'sm-and-down')} {
    background-image: url('../../../assets/footer_bg_mobile.png');
  }

  @media #{map-get($display-breakpoints, 'md-and-up')} {
    background-image: url('../../../assets/footer_bg.png');
    padding-top: 0;
  }

  nav {
    margin: 42px 0 26px;

    @media #{map-get($display-breakpoints, 'md-and-up')} {
      margin: 0 0 20px;
    }

    a {
      display: block;
      line-height: 2.1;

      @media #{map-get($display-breakpoints, 'md-and-up')} {
        margin-left: 28px;
        display: inline;
        line-height: 1.5;
      }
    }
  }

  address {
    @media #{map-get($display-breakpoints, 'sm-and-down')} {
      margin-bottom: 28px;
    }
  }
}
</style>
