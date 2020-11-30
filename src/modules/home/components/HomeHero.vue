<template>
  <v-sheet
    tile
    class="home-hero"
    color="#f5f5ff"
    :height="$vuetify.breakpoint.smAndDown ? 'auto' : 570"
  >
    <div class="content">
      <h1 class="primary--text">
        {{ $t('home.intro.title') }}
      </h1>

      <p class="body-1 mb-0 mt-6" v-html="$t('home.intro.text')" />

      <primary-button
        invert
        class="mt-7 px-10"
        @click="seeMore()"
      >
        {{ $t('shared.see_more') }}
      </primary-button>
    </div>
  </v-sheet>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import PrimaryButton from '@/modules/shared/components/PrimaryButton.vue'

@Component({
  components: {
    PrimaryButton,
  },
})
export default class HomeHero extends Vue {
  private seeMore() {
    this.$vuetify.goTo('#section-about')
  }
}
</script>

<style lang="scss" scoped>
@import '~vuetify/src/styles/styles.sass';

.home-hero {
  background-position: center center;
  background-size: 100% 100%;

  @media #{map-get($display-breakpoints, 'sm-and-down')} {
    background-image: url(../../../assets/home_hero_bg_mobile.png);
  }

  @media #{map-get($display-breakpoints, 'md-and-up')} {
    background-image: url(../../../assets/home_hero_bg.png);
    background-size: cover;
  }

  .content {
    align-items: flex-start;
    background-position: center right;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    margin: 0 auto;
    max-width: 1440px;
    padding: 40px 32px;

    @media #{map-get($display-breakpoints, 'sm-and-down')} {
      background-image: url(../../../assets/home_mascot_mobile.png);
    }

    @media #{map-get($display-breakpoints, 'md-and-up')} {
      background-image: url(../../../assets/home_mascot.png);
      background-origin: content-box;
      background-size: 700px 384px;
      padding: 24px 32px 24px 100px;
    }

    h1 {
      font-size: 24px;
      font-weight: 400;
      line-height: 1.2;
      max-width: 90%;

      @media #{map-get($display-breakpoints, 'md-and-up')} {
        font-size: 2.5rem;
        line-height: 49px;
        max-width: 659px;
      }
    }

    p {
      line-height: 200%;
      max-width: 210px;

      @media #{map-get($display-breakpoints, 'sm-only')} {
        max-width: 60%;
      }

      @media #{map-get($display-breakpoints, 'md-and-up')} {
        max-width: 590px;
      }
    }
  }
}
</style>
