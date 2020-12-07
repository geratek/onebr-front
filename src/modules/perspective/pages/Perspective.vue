<template>
  <div class="perspective-page">
    <v-container>
      <headline
        class="text-center pb-2"
        :title="$t('perspective.headline.title')"
        :subtitle="$t('perspective.headline.subtitle')"
      />

      <v-img
        src="@/assets/perspective_mascot.png"
        max-width="643"
        max-height="358"
        class="mascot"
      />

      <perspective-list />
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'

import { ViewDataScope } from '@/modules/shared/entities/ViewData'

import ViewDataMixin from '@/modules/shared/mixins/ViewDataMixin'

import Headline from '@/modules/shared/components/Headline.vue'
import PerspectiveList from '../components/PerspectiveList.vue'

@Component({
  components: {
    Headline,
    PerspectiveList,
  },
})
export default class Perspective extends Mixins(ViewDataMixin) {
  viewDataScope = ViewDataScope.perspective
}
</script>

<style lang="scss" scoped>
.perspective-page {
  @media #{map-get($display-breakpoints, 'md-and-up')} {
    background-image: url(../../../assets/perspective_bg.png);
  }

  .mascot {
    margin: 32px auto 40px;

    @media #{map-get($display-breakpoints, 'md-and-up')} {
      margin: 48px auto 90px;
    }
  }
}
</style>
