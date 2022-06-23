<template>
  <v-container class="home-bacteria">
    <vue-glide :options="options" :bullet="$vuetify.breakpoint.smAndDown">
      <vue-glide-slide
        v-for="bacterium in bacteria"
        :key="bacterium.name"
      >
        <figure class="text-center pa-3">
          <img
            :alt="`Bacterium ${bacterium.name}`"
            :src="bacterium.image"
            width="161"
            height="120"
          >
          <figcaption>
            <h1 class="display-1 font-weight-medium mb-2 mt-3">
              {{ $t(`home.bacteria.${bacterium.name}`) }}
            </h1>
            <p class="title font-italic font-weight-regular mb-1">
              {{ bacterium.scientificName }}
            </p>
            <p class="body-2 grey--text text--darken-1 mb-8">
              {{ bacterium.origin }}
            </p>
            <primary-button :to="{
              name: 'bacteria',
              params: { name: bacterium.name }
            }">
              {{ $t('home.see_map') }}
            </primary-button>
          </figcaption>
        </figure>
      </vue-glide-slide>

      <template slot="control" v-if="$vuetify.breakpoint.smAndDown">
        <button data-glide-dir="<">
          <Icon name="chevron_left" />
        </button>
        <button data-glide-dir=">">
          <Icon name="chevron_right" />
        </button>
      </template>
    </vue-glide>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { Glide, GlideSlide } from 'vue-glide-js'

import Bacteria from '@/modules/shared/entities/Bacteria'

import PrimaryButton from '@/modules/shared/components/PrimaryButton.vue'
import Icon from '@/modules/shared/components/Icon.vue'

import 'vue-glide-js/dist/vue-glide.css'

const SharedModule = namespace('shared')

@Component({
  components: {
    PrimaryButton,
    Icon,
    [Glide.name]: Glide,
    [GlideSlide.name]: GlideSlide,
  },
})
export default class HomeBacteria extends Vue {
  @SharedModule.State
  private readonly bacteria!: Bacteria[]

  private get options(): unknown {
    return {
      perView: 5,
      rewind: false,
      bound: true,
      breakpoints: {
        600: {
          perView: 1,
        },
        724: {
          perView: 2,
        },
        960: {
          perView: 3,
        },
      },
    }
  }
}
</script>

<style lang="scss" scoped>
.home-bacteria {
  padding: 51px 0 0;

  @media #{map-get($display-breakpoints, 'lg-and-up')} {
    padding: 84px 0 0;
  }
}
</style>
