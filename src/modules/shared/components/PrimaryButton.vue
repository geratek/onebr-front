<template>
  <v-btn
    rounded
    depressed
    color="primary"
    v-bind="$attrs"
    v-on="$listeners"
    :large="isDesktop"
    :outlined="!invert"
  >
    <slot />
  </v-btn>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  inheritAttrs: false,
})
export default class PrimaryButton extends Vue {
  @Prop({ default: false, type: Boolean }) private invert!: boolean

  private get isDesktop(): boolean {
    return this.$vuetify.breakpoint.mdAndUp
  }
}
</script>
