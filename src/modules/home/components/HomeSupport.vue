<template>
  <v-container px-0 px-md-9>
    <v-row>
      <v-col>
        <h2 class="display-2 primary--text mb-8 pl-7 pl-md-4 ml-md-12">
          {{ $t('home.support.title') }}
        </h2>

        <div class="glide-container">
          <div class="support-img" v-for="image in supportImages"
            :key="image.id">
              <v-img
                contain
                max-height="100"
                :alt="image.tooltip"
                :src="image.src"
              />
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { Glide, GlideSlide } from 'vue-glide-js'

import Image from '@/modules/shared/entities/Image'

import Icon from '@/modules/shared/components/Icon.vue'

const HomeModule = namespace('home')

@Component({
  components: {
    Icon,
    [Glide.name]: Glide,
    [GlideSlide.name]: GlideSlide,
  },
})
export default class HomeSupport extends Vue {
  @HomeModule.Getter
  private readonly supportImages!: Image[]

  private get options(): unknown {
    return {
      perView: 8,
      bound: true,
      gap: 18,
      rewind: false,
      breakpoints: {
        600: {
          perView: 2,
        },
        960: {
          perView: 4,
        },
        1024: {
          perView: 6,
        },
      },
    }
  }
}
</script>

<style lang="scss" scoped>
.glide-container {
  padding: 0 52px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}

.support-img {
  margin: 0 30px 30px 30px;
}

.glide {
  &::v-deep &__slides {
    align-items: center;
  }

  [data-glide-el="controls"] {
    button:first-child {
      left: -52px;
    }

    button:last-child {
      right: -52px;
    }
  }
}
</style>
