<template>
  <div
    ref="mapContainer"
    class="bacteria-map"
    :class="{'bacteria-map--full': fullscreen}"
  >
    <bacteria-menu />

    <l-map
      ref="map"
      class="bacteria-map__leaflet"
      :zoom="mapConfig.zoom"
      :center="mapConfig.center"
      :options="mapConfig.options"
      :bounds="mapConfig.bounds"
      :max-bounds="mapConfig.maxBounds"
    >
      <l-tile-layer v-bind="mapConfig.tileLayer" />
      <v-marker-cluster ref="cluster" :options="mapConfig.cluster">
        <l-circle-marker
          v-for="coordinate in coordinates"
          v-bind="mapConfig.marker"
          :className="coordinate.selected ? 'blink' : ''"
          :key="coordinate.id"
          :lat-lng="getLatLng(coordinate)"
          :options="{
            coordinateId: coordinate.id,
            selected: coordinate.selected,
          }"
        />
      </v-marker-cluster>
    </l-map>

    <map-ebursts />

    <map-control
      :fullscreen.sync="fullscreen"
      @zoom-in="zoomInOut(1)"
      @zoom-out="zoomInOut(-1)"
    />

    <confirm-dialog
      :title="$t('bacteria.confirm.title')"
      :message="$t('bacteria.confirm.message')"
      :value="confirm"
      @cancel="closeDialog()"
      @confirm="proceed()"
    />
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import VMarkerCluster from 'vue2-leaflet-markercluster'
import { Component, Vue } from 'vue-property-decorator'
import { LMap, LTileLayer, LCircleMarker } from 'vue2-leaflet'
import { namespace } from 'vuex-class'
import { latLng } from 'leaflet'

import Coordinate from '@/modules/shared/entities/Coordinate'
import BacteriaFilter from '@/modules/shared/entities/BacteriaFilter'

import ConfirmDialog from '@/modules/shared/components/ConfirmDialog.vue'
import BacteriaMenu from './BacteriaMenu.vue'
import MapControl from './MapControl.vue'
import MapEbursts from './MapEbursts.vue'

const BacteriaModule = namespace('bacteria')

@Component({
  components: {
    BacteriaMenu,
    ConfirmDialog,
    LCircleMarker,
    LMap,
    LTileLayer,
    MapControl,
    VMarkerCluster,
    MapEbursts,
  },
})
export default class BacteriaMap extends Vue {
  $refs!: {
    mapContainer: HTMLDivElement;
    map: LMap;
    cluster: any;
  }

  @BacteriaModule.State
  private readonly coordinates!: Coordinate[]

  @BacteriaModule.State
  private readonly mapConfig!: any

  @BacteriaModule.State
  private readonly filter!: BacteriaFilter

  @BacteriaModule.Action
  private readonly fetchExperiments!: (filter: BacteriaFilter) => Promise<void>

  private fullscreen = false

  private confirm = false

  private selectedIds: number[] = []

  private getLatLng(coordinate: Coordinate) {
    return latLng(coordinate.latitude, coordinate.longitude)
  }

  private zoomInOut(amount: number) {
    const map = this.$refs.map.mapObject
    const zoom = map.getZoom()
    map.setZoom(zoom + amount)
  }

  private proceed() {
    const filter = new BacteriaFilter({
      ids: this.selectedIds,
      type: this.filter.type,
    })

    this.fetchExperiments(filter)
    this.closeDialog()
  }

  private closeDialog() {
    this.confirm = false
    this.selectedIds = []
  }

  mounted() {
    this.$nextTick(() => {
      const markers = this.$refs.cluster.mapObject

      markers.on('click', (a: any) => {
        this.selectedIds = [a.layer.options.coordinateId]
        this.confirm = true
      })

      markers.on('clusterclick', (a: any) => {
        try {
          const childMarkers = a.layer.getAllChildMarkers()
          this.selectedIds = childMarkers.map((cM: any) => cM.options.coordinateId)
          this.confirm = true
        } catch (err) {
          console.log(err)
        }
      })

      setTimeout(() => {
        const height = this.$refs.mapContainer.clientHeight
        const map = this.$refs.map.mapObject

        const center = map.getCenter()
        map.setView(center, height < 400 ? 3.0 : 3.5)
      }, 300)
    })

    this.$refs.mapContainer.addEventListener('transitionend', (evt: Event) => {
      if (evt.target === this.$refs.mapContainer) {
        const map = this.$refs.map.mapObject
        const zoom = this.fullscreen ? map.getZoom() + 1 : map.getZoom() - 1

        map.invalidateSize()

        const center = map.getCenter()
        map.setView(center, zoom)
      }
    })
  }
}
</script>

<style lang="scss" scoped>
@import "~leaflet.markercluster/dist/MarkerCluster.css";

.bacteria-map {
  background-color: #FFF;
  box-shadow: 0px -2px 4px rgba(0, 0, 0, 0.15) inset;
  height: 400px;
  position: relative;
  transition: all 300ms linear;
  z-index: 0;

  @media #{map-get($display-breakpoints, 'md-and-up')} {
    background: -10px -90px no-repeat url('../../../../assets/antibiograma.png'), linear-gradient(187.34deg, #f1f1f1 13.88%, #f1f1f1 69.22%, rgba(204, 204, 204, 0) 88.19%);
  }

  @media screen and (max-height: 768px) {
    height: 40vh;
    min-height: 40vh;
  }

  @media #{map-get($display-breakpoints, 'sm-and-down')} {
    box-shadow: none;
    flex-grow: 1;
    height: auto;
    min-height: auto;
  }

  &--full {
    height: 75vh !important;
    max-height: 720px !important;
    min-height: auto !important;
  }

  &__leaflet {
    background-color: transparent;
    height: 100%;
  }
}
</style>

<style lang="scss">
.onebr-marker-cluster {
  align-items: center;
  background: rgba(0, 0, 100, 0.8);
  border-radius: 100%;
  border: 2px solid rgb(77, 96, 164);
  color: white;
  display: flex;
  font-size: 9px;
  justify-content: center;
}

.blink {
  background: #1A1AD5;
  animation: blinker 700ms cubic-bezier(.5, 0, 1, 1) infinite alternate;
}

@keyframes blinker {
  from { opacity: 1; }
  to { opacity: 0; }
}
</style>
