<template>
  <div class="bacteria-menu">
    <v-select
      hide-details
      hide-selected
      rounded
      dense
      append-icon="keyboard_arrow_down"
      background-color="white"
      item-value="name"
      v-model="currentBacteria"
      :height="$vuetify.breakpoint.smAndDown ? 40 : 50"
      :items="bacteria"
      :menu-props="menuProps"
    >
      <template #selection="{ item }">
        <component class="mr-2" :is="`${item.name}Icon`" />
        <span class="subtitle-2 font-italic">
          {{ item.scientificName }}
        </span>
      </template>
      <template #item="{ item }">
        <component class="mr-2" :is="`${item.name}Icon`" />
        <span class="subtitle-2 font-italic">
          {{ item.scientificName }}
        </span>
      </template>
    </v-select>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

import Bacteria from '@/modules/shared/entities/Bacteria'

import EcBrIcon from '@/modules/shared/components/icons/EcBrIcon.vue'
import KpBrIcon from '@/modules/shared/components/icons/KpBrIcon.vue'
import SeBrIcon from '@/modules/shared/components/icons/SeBrIcon.vue'
import PaBrIcon from '@/modules/shared/components/icons/PaBrIcon.vue'
import COVIDIcon from '@/modules/shared/components/icons/COVIDIcon.vue'

const SharedModule = namespace('shared')

@Component({
  components: {
    EcBrIcon,
    KpBrIcon,
    SeBrIcon,
    PaBrIcon,
    COVIDIcon,
  },
})
export default class BacteriaMenu extends Vue {
  @SharedModule.State
  private readonly bacteria!: Bacteria[]

  private get currentBacteria() {
    return this.$route.params.name
  }

  private set currentBacteria(name: string) {
    this.$router.replace({ params: { name } })
  }

  private get menuProps() {
    return {
      nudgeTop: -10,
      offsetY: true,
      transition: 'slide-y-transition',
    }
  }
}
</script>

<style lang="scss" scoped>
.bacteria-menu {
  left: 32px;
  position: absolute;
  right: 32px;
  top: 20px;
  z-index: 1000;

  .v-input {
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.3);
  }

  @media #{map-get($display-breakpoints, 'md-and-up')} {
    left: 50px;
    right: auto;
    width: 300px;

    .v-input {
      box-shadow: none;
    }

    ::v-deep .v-icon {
      margin-top: 3px !important;
    }
  }
}
</style>
