<template>
  <div :class="['map__ebursts', currentBacteria]">
    <a
      target="_blank"
      @click="openDialog"
      :href="$t(`bacteria.ebursts.${currentBacteria}`)"
    />

    <v-dialog v-model="dialog">
      <v-card>
        <v-card-text class="pa-4 pt-6">
          <v-btn icon class="close-button" @click="dialog = false">
            <Icon
              name="close"
              color="primary"
              size="18"
            />
          </v-btn>

          <v-img contain height="170" :src="eburstsImg" />
        </v-card-text>
        <v-card-actions class="pb-8 justify-center">
          <primary-button
            target="_blank"
            :href="$t(`bacteria.ebursts.${currentBacteria}`)"
          >
            {{ $t('bacteria.see_more') }}
          </primary-button>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import Icon from '@/modules/shared/components/Icon.vue'
import PrimaryButton from '@/modules/shared/components/PrimaryButton.vue'

@Component({
  components: {
    PrimaryButton,
    Icon,
  },
})
export default class MapEbursts extends Vue {
  private dialog = false

  private get currentBacteria(): string {
    const { name } = this.$route.params

    return name.toLowerCase()
  }

  private openDialog(event: Event) {
    if (this.$vuetify.breakpoint.smAndDown) {
      event.preventDefault()

      this.dialog = true
    }
  }

  private get eburstsImg(): string {
    try {
      // eslint-disable-next-line
      return require(`@/assets/ebursts/${this.currentBacteria}.png`)
    } catch (_) {
      return ''
    }
  }
}
</script>

<style lang="scss" scoped>
.map__ebursts {
  background-color: white;
  background-size: contain;
  bottom: 63px;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.15);
  height: 46px;
  left: 24px;
  position: absolute;
  width: 52px;
  z-index: 1000;

  @media #{map-get($display-breakpoints, 'md-and-up')} {
    bottom: 30px;
    box-shadow: none;
    height: 150px;
    left: auto;
    right: 112px;
    width: 167px;
  }

  &.ecbr {
    background-image: url(../../../../assets/ebursts/ecbr.png);
  }

  &.kpbr {
    background-image: url(../../../../assets/ebursts/kpbr.png);
  }

  &.sebr {
    background-image: url(../../../../assets/ebursts/sebr.png);
  }

  &.pabr {
    display: none;
  }

  &.covid {
    display: none;
  }

  a {
    width: 100%;
    height: 100%;
    display: block;
  }
}

.close-button {
  position: absolute;
  right: 10px;
  top: 10px;
  z-index: 100;
}
</style>
