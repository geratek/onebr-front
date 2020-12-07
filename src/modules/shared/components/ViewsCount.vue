<template>
  <div class="views-count primary" :class="{expanded: expanded}">
    <div class="views-count__inner">
      <v-btn icon large @click="toggleExpand(!expanded)">
        <global-icon />
      </v-btn>

      <span class="subtitle-2 text-no-wrap mr-2">
        <span ref="views">{{ totalViews }}</span> {{ $t('shared.views') }}
      </span>

      <v-btn icon large @click="toggleExpand(false)">
        <icon name="close" color="white" />
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

import GlobalIcon from '@/modules/shared/components/icons/GlobalIcon.vue'
import Icon from '@/modules/shared/components/Icon.vue'

const SharedModule = namespace('shared')

@Component({
  components: {
    GlobalIcon,
    Icon,
  },
})
export default class ViewsCount extends Vue {
  $refs!: {
    views: HTMLSpanElement;
  }

  @SharedModule.State
  private readonly totalViews!: number

  @SharedModule.Action
  private readonly fetchTotalViews!: () => Promise<void>

  private expanded = false

  private toggleExpand(expanded: boolean) {
    this.expanded = expanded
  }

  private mounted() {
    this.fetchTotalViews()
  }
}
</script>

<style lang="scss" scoped>
.views-count {
  border-radius: 30px;
  bottom: 16px;
  color: white;
  opacity: .5;
  overflow: hidden;
  position: fixed;
  right: 16px;
  width: 50px;
  z-index: 1;

  &__inner {
    align-items: center;
    display: flex;
  }

  &.expanded {
    width: auto;
    opacity: 1;
  }

  @media #{map-get($display-breakpoints, 'md-and-up')} {
    bottom: 230px;
    right: 50px;
  }
}
</style>
