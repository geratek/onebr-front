<template>
  <v-autocomplete
    chips
    eager
    hide-details
    hide-no-data
    multiple
    outlined
    rounded
    small-chips
    item-text="name"
    item-value="id"
    ref="autocomplete"
    :value="value"
    :items="subSpecies"
    :loading="loading"
    :placeholder="placeholder || $t('bacteria.filter.sub_specie')"
    :return-object="returnObject"
    :menu-props="{
      nudgeBottom: 10,
      transition: 'slide-y-transition'
    }"
    @input="$emit('input', $event)"
  >
    <template #selection="data">
      <v-chip
        close
        close-icon="close"
        class="caption secondary primary--text ma-0 mr-2"
        v-if="data.index <= maxVisible"
        v-bind="data.attrs"
        :outlined="data.index == maxVisible"
        :input-value="data.selected"
        @click="data.select"
        @click:close="removeSubSpecies(data.index)"
      >
        <span v-if="data.index == maxVisible" class="font-weight-bold">
          + {{ value.length - data.index }}
        </span>
        <span v-else>
          {{ data.item.name }}
        </span>
      </v-chip>
    </template>

    <template #item="{ item }">
      <v-list-item-content>
        <v-list-item-title class="caption">
          {{ item.name }}
        </v-list-item-title>
      </v-list-item-content>
    </template>

    <template #append>
      <slot name="icon">
        <Icon name="arrow_drop_down" color="primary"/>
      </slot>
    </template>
  </v-autocomplete>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

import BacteriaFilterService from '@/modules/shared/services/BacteriaFilterService'

import Icon from '@/modules/shared/components/Icon.vue'

@Component({
  components: {
    Icon,
  },
})
export default class SubSpecieAutocomplete extends Vue {
  $refs!: {
    autocomplete: any;
  }

  @Prop({ default: () => [], type: Array })
  private readonly value!: unknown[]

  @Prop({ default: 2 })
  private readonly maxVisible!: number

  @Prop({ default: false, type: Boolean })
  private readonly returnObject!: boolean

  @Prop({ default: '' })
  private readonly placeholder!: string

  @Prop({ required: true })
  private readonly groupId!: number

  private subSpecies = this.value

  private loading = false

  private async getsubSpecies() {
    this.loading = true

    try {
      const { data } = await BacteriaFilterService.getSubSpecies(this.groupId)

      this.subSpecies = data
    } catch (err) {
      console.error(err)
    } finally {
      this.loading = false
    }
  }

  private removeSubSpecies(index: number) {
    const deleteCount = (index === this.maxVisible) ? Infinity : 1
    const copyValue = [...this.value]

    copyValue.splice(index, deleteCount)

    this.$emit('input', copyValue)
  }

  handleTouchOutside(event: Event) {
    const target = event.target as Element
    const { autocomplete } = this.$refs

    try {
      if (autocomplete.isFocused && !target.closest('.v-autocomplete__content')) {
        autocomplete.isFocused = false
      }
    } catch (_) { /** */ }
  }

  mounted() {
    this.getsubSpecies()
    document.body.addEventListener('touchmove', this.handleTouchOutside)
  }

  destroyed() {
    document.body.removeEventListener('touchmove', this.handleTouchOutside)
  }
}
</script>
