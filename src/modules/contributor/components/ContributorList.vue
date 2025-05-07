<template>
  <div class="contributor-list">
    <v-chip
      v-for="contributor in contributors"
      :key="contributor.order"
      color="secondary"
      class="primary--text mr-md-5 mb-5 px-md-5"
    >
      {{ contributor.name }} - {{ contributor.description }}
    </v-chip>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

import Contributor from '@/modules/shared/entities/Contributor'

const ContributorModule = namespace('contributor')

@Component
export default class ContributorList extends Vue {
  @ContributorModule.Getter
  private readonly contributors!: Contributor[]
}
</script>

<style lang="scss" scoped>
.contributor-list {
  margin: 0 auto;
  max-width: 1215px;
  text-align: center;

  @media #{map-get($display-breakpoints, 'md-and-up')} {
    padding-left: 20px;
  }

  @media #{map-get($display-breakpoints, 'sm-and-down')} {
    display: flex;
    flex-direction: column;
    align-items: center;

    .v-chip {
      font-size: 11px;
      white-space: normal;
      min-height: 32px;
    }
  }
}
</style>
