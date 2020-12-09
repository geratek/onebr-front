<template>
  <div class="map-control">
    <v-tooltip left v-if="isDesktop">
      <template #activator="{ on }">
        <v-btn
          class="mb-8"
          color="white"
          v-on="on"
          :height="buttonSize"
          :min-width="buttonSize"
          @click="$emit('update:fullscreen', !fullscreen)"
        >
          <fullscreen-exit-icon
            v-if="fullscreen"
          />
          <fullscreen-icon v-else />
        </v-btn>
      </template>
      <span v-show="!fullscreen">
        {{ $t('bacteria.enlarge_map') }}
      </span>
      <span v-show="fullscreen">
        {{ $t('bacteria.collapse_map') }}
      </span>
    </v-tooltip>

    <div class="map-control__zoom">
      <v-btn
        class="mb-3"
        color="white"
        :height="buttonSize"
        :min-width="buttonSize"
        @click="$emit('zoom-in')"
      >
        <add-icon
          :height="iconSize"
          :width="iconSize"
        />
      </v-btn>
      <v-btn
        color="white"
        :height="buttonSize"
        :min-width="buttonSize"
        @click="$emit('zoom-out')"
      >
        <remove-icon
          :height="iconSize"
          :width="iconSize"
        />
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

import AddIcon from '@/modules/shared/components/icons/AddIcon.vue'
import RemoveIcon from '@/modules/shared/components/icons/RemoveIcon.vue'
import FullscreenIcon from '@/modules/shared/components/icons/FullscreenIcon.vue'
import FullscreenExitIcon from '@/modules/shared/components/icons/FullscreenExitIcon.vue'

@Component({
  components: {
    AddIcon,
    FullscreenExitIcon,
    FullscreenIcon,
    RemoveIcon,
  },
})
export default class MapControl extends Vue {
  @Prop({ required: true })
  private readonly fullscreen!: boolean

  private get isDesktop(): boolean {
    return this.$vuetify.breakpoint.mdAndUp
  }

  private get buttonSize(): number {
    return this.isDesktop ? 40 : 30
  }

  private get iconSize(): number {
    return this.buttonSize * 0.6
  }
}
</script>

<style lang="scss" scoped>
.map-control {
  bottom: 63px;
  position: absolute;
  width: 30px;
  right: 24px;
  z-index: 1000;

  @media #{map-get($display-breakpoints, 'md-and-up')} {
    bottom: 60px;
    width: 40px;
    right: 65px;
  }

  .v-btn {
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.3);
  }

  &, &__zoom {
    display: flex;
    flex-direction: column;
  }
}
</style>
