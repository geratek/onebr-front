<template>
  <div class="support-list">
    <v-img
      contain
      class="support-list__logo"
      v-for="image in contributorImages"
      :key="image.id"
      :alt="image.tooltip"
      :src="image.src"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

import Image from '@/modules/shared/entities/Image'

const ContributorModule = namespace('contributor')

@Component
export default class SupportList extends Vue {
  @ContributorModule.Getter
  private readonly contributorImages!: Image[]
}
</script>

<style lang="scss" scoped>
.support-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  @media #{map-get($display-breakpoints, 'md-and-up')} {
    padding-left: 40px;
    flex-direction: row;
  }

  &__logo {
    margin-top: 40px;
    max-height: 100px;
    max-width: 148px;

    @media #{map-get($display-breakpoints, 'md-and-up')} {
      margin-right: 40px;
      margin-top: 80px;
    }
  }
}
</style>
