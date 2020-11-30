<template>
  <div id="section-about">
    <v-container fill-height>
      <v-row>
        <v-col class="text-center" cols="12" md="6" lg="5">
          <img
            v-if="$vuetify.breakpoint.smAndDown"
            src="@/assets/home_about_person_mobile.png"
            class="mb-3 mt-9"
            width="279"
            height="267"
          />

          <img
            v-else
            src="@/assets/home_about_person.png"
            width="441"
            height="419"
          />
        </v-col>
        <v-col class="px-7 pl-md-3 pr-md-12" cols="12" md="6" lg="7">
          <h2 class="display-2 primary--text mb-6">
            {{ $t('home.about.title') }}
          </h2>
          <p class="body-2 ma-0" v-html="$t('home.about.text')" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class HomeAbout extends Vue {}
</script>

<style lang="scss" scoped>
#section-about {
  background-position: center center;
  background-size: 100% 100%;

  @media #{map-get($display-breakpoints, 'sm-and-down')} {
    background-image: url(../../../assets/home_about_bg_mobile.png);
  }

  @media #{map-get($display-breakpoints, 'md-and-up')} {
    background-image: url(../../../assets/home_about_bg.png);
    height: 695px;
  }

  p {
    line-height: 185%;
  }
}
</style>
