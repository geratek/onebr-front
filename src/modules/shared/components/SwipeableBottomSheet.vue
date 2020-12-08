<template>
  <div :class="['swipeable-bottom-sheet', {'--open': state === 'open' ? 1 : 0}]">
    <div class="overlay" @click="setState('half')" />
    <div
      ref="card"
      class="card"
      :data-state="isMove ? 'move' : state"
      :style="{ top: `${isMove ? y : calcY()}px` }"
    >
      <div class="pan-area" ref="pan" @click="toggleHalf()">
        <p class="body-2 ma-0 text-center">
          Visualizar tabela
        </p>
      </div>

      <div class="contents">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import Hammer from 'hammerjs'

export default {
  props: {
    halfY: {
      type: Number,
      default: 0.62,
    },
    defaultState: {
      type: String,
      default: 'close',
    },
  },
  data() {
    return {
      mc: null,
      y: 0,
      startY: 0,
      isMove: false,
      state: this.defaultState,
      rect: {},
    }
  },
  mounted() {
    window.onresize = () => {
      this.rect = this.$refs.card.getBoundingClientRect()
    }
    this.rect = this.$refs.card.getBoundingClientRect()
    this.mc = new Hammer(this.$refs.pan)
    this.mc.get('pan').set({ direction: Hammer.DIRECTION_ALL })
    this.mc.on('panup pandown', (evt) => {
      this.y = evt.center.y - 16
    })
    this.mc.on('panstart', (evt) => {
      this.startY = evt.center.y
      this.isMove = true
    })
    this.mc.on('panend', (evt) => {
      this.isMove = false
      switch (this.state) {
        case 'close':
        case 'half':
          if (this.state === 'close') {
            if (this.startY - evt.center.y > 120) {
              this.state = 'half'
            }
            if (this.startY - evt.center.y > 320) {
              this.state = 'open'
            }
            break
          }
          if (this.startY - evt.center.y > 120) {
            this.state = 'open'
          }
          if (this.startY - evt.center.y < -50) {
            this.state = 'close'
          }
          break
        case 'open':
          if (this.startY - evt.center.y < -120) {
            this.state = 'half'
          }
          break
        default:
      }
    })
  },
  beforeDestroy() {
    this.mc.destroy()
    window.onresize = null
  },
  methods: {
    calcY() {
      switch (this.state) {
        case 'close':
          return this.rect.height - 37
        case 'open':
          return this.$vuetify.application.top
        case 'half':
          return this.rect.height * this.halfY
        default:
          return this.y
      }
    },
    setState(state) {
      this.state = state
    },
    toggleHalf() {
      switch (this.state) {
        case 'close':
          this.state = 'half'
          break

        case 'half':
          this.state = 'close'
          break

        default:
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.swipeable-bottom-sheet {
  &.--open {
    left: 0;
    position: fixed;
    top: 0;

    .overlay {
      background: rgba(0, 0, 0, .3);
      bottom: 0;
      display: block;
      left: 0;
      position: fixed;
      right: 0;
      top: 0;
      transition: all .3s;
    }
  }

  .card {
    background: white;
    box-shadow: 0 -1px 0 0 rgba(0, 0, 0, .15);
    height: 100vh;
    left: 0;
    position: fixed;
    width: 100%;

    &.--half,
    &.--open,
    &.--close {
      transition: top .3s ease-out;
    }

    .contents {
      overflow-y: scroll;
      max-height: 100%;
      padding-bottom: calc(100vh * 0.2);
      box-sizing: border-box;
    }
  }
}

.pan-area {
  padding: 10px;

  p {
    &:hover {
      cursor: grab;
    }

    &:active {
      cursor: grabbing;
    }
  }
}
</style>
