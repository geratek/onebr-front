<template>
  <v-form class="experiment-filter" autocomplete="off">
    <v-container>
      <v-row align="center">
        <v-col md="3">
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
        <v-col md="4">
          <sub-specie-autocomplete
            v-show="isCovid"
            :groupId="13"
            :value="filter.subSpecieIds"
            :maxVisible="1"
            @input="applyFilter('subSpecieIds', $event)"
          />

          <resistome-autocomplete
            v-show="!isCovid"
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
import SubSpecieAutocomplete from './SubSpecieAutocomplete.vue'

const BacteriaModule = namespace('bacteria')

@Component({
  components: {
    DatePicker,
    DeleteIcon,
    Icon,
    ResistomeAutocomplete,
    SearchIcon,
    SubSpecieAutocomplete,
  },
})
export default class ExperimentFilter extends Vue {
  @Prop({ default: false })
  private readonly isCovid!: boolean

  @BacteriaModule.State
  private readonly filter!: BacteriaFilter

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
