<template>
  <v-form class="experiment-filter" autocomplete="off">
    <v-container>
      <v-row align="center">
        <v-col :md="isCovid ? '4': '3'">
          <v-text-field
            clearable
            outlined
            rounded
            hide-details
            :value="filter.searchTerm"
            :placeholder="$t('bacteria.filter.search')"
            @input="debouncedApplyFilter('searchTerm', $event)"
          >
            <template #append>
              <search-icon />
            </template>
          </v-text-field>
        </v-col>
        <v-col :md="isCovid ? '3' : '4'">
          <v-select
            clearable
            outlined
            rounded
            hide-details
            item-text="name"
            item-value="type"
            v-if="isCovid"
            :value="filter.specie"
            :items="species"
            :placeholder="$t('bacteria.filter.specie')"
            @change="applyFilter('specie', $event)"
          >
            <template #append>
              <Icon name="arrow_drop_down" color="primary"/>
            </template>
          </v-select>

          <resistome-autocomplete
            v-else
            :value="filter.resistomes"
            @input="applyFilter('resistomes', $event)"
          />
        </v-col>
        <v-col md="2">
          <date-picker
            clearable
            :value="filter.startDate"
            :max="filter.endDate"
            :placeholder="$t('bacteria.filter.start_date')"
            @input="applyFilter('startDate', $event)"
          />
        </v-col>
        <v-col md="2">
          <date-picker
            left
            clearable
            :value="filter.endDate"
            :min="filter.startDate"
            :placeholder="$t('bacteria.filter.end_date')"
            @input="applyFilter('endDate', $event)"
          />
        </v-col>
        <v-col md="1">
          <v-btn
            text
            small
            class="caption text-capitalize"
            @click="clearSearch()"
          >
            <DeleteIcon class="mr-2" />
            {{ $t('shared.clear') }}
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

import { debounce } from '@/modules/shared/utils/functions'

import BacteriaFilter from '@/modules/shared/entities/BacteriaFilter'

import DatePicker from '@/modules/shared/components/DatePicker.vue'
import DeleteIcon from '@/modules/shared/components/icons/DeleteIcon.vue'
import SearchIcon from '@/modules/shared/components/icons/SearchIcon.vue'
import Icon from '@/modules/shared/components/Icon.vue'
import ResistomeAutocomplete from './ResistomeAutocomplete.vue'

const BacteriaModule = namespace('bacteria')

@Component({
  components: {
    DatePicker,
    DeleteIcon,
    ResistomeAutocomplete,
    SearchIcon,
    Icon,
  },
})
export default class ExperimentFilter extends Vue {
  @Prop({ default: false })
  private readonly isCovid!: boolean

  @BacteriaModule.State
  private readonly filter!: BacteriaFilter

  @BacteriaModule.State
  private readonly species!: unknown[]

  @BacteriaModule.Action
  private readonly fetchExperiments!: (filter: BacteriaFilter) => Promise<void>

  private debouncedApplyFilter = debounce(this.applyFilter, 750)

  private applyFilter(name: string, value: string|number|number[]): void {
    const newFilter = this.filter.copyWith({
      [name]: value,
      page: 1,
    })

    this.fetchExperiments(newFilter)
  }

  private clearSearch() {
    const newFilter = BacteriaFilter.empty()

    newFilter.type = this.filter.type

    this.fetchExperiments(newFilter)
  }
}
</script>

<style lang="scss" scoped>
.experiment-filter {
  .container {
    padding: 8px 16px;
  }
}
</style>
