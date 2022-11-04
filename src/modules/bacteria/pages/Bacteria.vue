<template>
  <div class="bacteria-page" :style="{ height: `calc(100vh - ${$vuetify.application.top}px)` }">
    <bacteria-map />

    <swipeable-bottom-sheet v-if="$vuetify.breakpoint.smAndDown">
      <experiment-table />
    </swipeable-bottom-sheet>

    <experiment-table v-else />
  </div>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

import BacteriaFilter from '@/modules/shared/entities/BacteriaFilter'

import SwipeableBottomSheet from '@/modules/shared/components/SwipeableBottomSheet.vue'
import BacteriaMap from '../components/map/BacteriaMap.vue'
import ExperimentTable from '../components/table/ExperimentTable.vue'

const BacteriaModule = namespace('bacteria')

@Component({
  components: {
    BacteriaMap,
    ExperimentTable,
    SwipeableBottomSheet,
  },
})
export default class Bacteria extends Vue {
  @BacteriaModule.Action
  private readonly fetchCoordinates!: (bacteria: string) => Promise<void>

  @BacteriaModule.Action
  private readonly fetchExperiments!: (filter: BacteriaFilter) => Promise<void>

  @Watch('$route.params.name')
  private changeBacteria() {
    this.fetchData()
  }

  mounted() {
    this.fetchData()
  }

  private fetchData() {
    const map: { [key: string]: string } = {
      KpBr: 'KP_BR',
      SeBr: 'SE_BR',
      EcBr: 'EC_BR',
      PaBr: 'PA_BR',
      COVID: 'CV_19',
      SaBr: 'SA_BR',
    }
    const { name } = this.$route.params
    const bacteria = map[name]
    const filter = new BacteriaFilter({ type: bacteria })

    this.fetchExperiments(filter)
    this.fetchCoordinates(bacteria)
  }

  created() {
    this.disablePageScroll()
  }

  destroyed() {
    this.enablePageScroll()
  }

  private disablePageScroll() {
    this.setOverflow('hidden')
  }

  private enablePageScroll() {
    this.setOverflow()
  }

  private setOverflow(overflow = '') {
    const html = document.querySelector('html')
    if (html) {
      html.style.overflow = overflow
    }
  }
}
</script>

<style lang="scss" scoped>
.bacteria-page {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 0 0 40px;

  @media #{map-get($display-breakpoints, 'md-and-up')} {
    padding: 0;
  }

  @media print {
    visibility: hidden;
  }
}
</style>
