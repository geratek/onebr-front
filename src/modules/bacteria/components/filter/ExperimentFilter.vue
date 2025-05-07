<template>
  <v-form class="experiment-filter" autocomplete="off">
    <v-container>
      <v-row align="center">
        <v-col cols="12" md="3">
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
        <v-col cols="12" md="4">
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
            :placeholder="startDatePlaceholder"
            @input="applyFilter('startDate', $event)"
          />
        </v-col>
        <v-col md="2">
          <date-picker
            left
            clearable
            :value="filter.endDate"
            :min="filter.startDate"
            :placeholder="endDatePlaceholder"
            @input="applyFilter('endDate', $event)"
          />
        </v-col>
        <v-col cols="auto" md="1">
          <v-btn
            text
            small
            class="caption text-capitalize"
            @click="clearSearch()"
          >
            <DeleteIcon class="mr-md-2" />
            <span class="hidden-sm-and-down">
              {{ $t('shared.clear') }}
            </span>
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

  private get startDatePlaceholder() {
    if (this.$vuetify.breakpoint.xsOnly) {
      return this.$t('shared.start') as string
    }

    return this.$t('bacteria.filter.start_date') as string
  }

  private get endDatePlaceholder() {
    if (this.$vuetify.breakpoint.xsOnly) {
      return this.$t('shared.end') as string
    }

    return this.$t('bacteria.filter.end_date') as string
  }
}
</script>

<style lang="scss" scoped>
.experiment-filter {
  .container {
    padding: 0 16px 26px;

    @media #{map-get($display-breakpoints, 'md-and-up')} {
      padding: 8px 16px;
    }
  }

  @media #{map-get($display-breakpoints, 'sm-and-down')} {
    &::v-deep .v-input {
      font-size: 12px;
    }

    .xl-1, .col-lg, .col-lg-auto, .col-lg-12, .col-lg-11, .col-lg-10, .col-lg-9, .col-lg-8,
    .col-lg-7, .col-lg-6, .col-lg-5, .col-lg-4, .col-lg-3, .col-lg-2, .col-lg-1, .col-md,
    .col-md-auto, .col-md-12, .col-md-11, .col-md-10, .col-md-9, .col-md-8, .col-md-7,
    .col-md-6, .col-md-5, .col-md-4, .col-md-3, .col-md-2, .col-md-1, .col-sm, .col-sm-auto,
    .col-sm-12, .col-sm-11, .col-sm-10, .col-sm-9, .col-sm-8, .col-sm-7, .col-sm-6, .col-sm-5,
    .col-sm-4, .col-sm-3, .col-sm-2, .col-sm-1, .col, .col-auto, .col-12, .col-11, .col-10,
    .col-9, .col-8, .col-7, .col-6, .col-5, .col-4, .col-3, .col-2, .col-1 {
      padding: 6px;
    }

    .row {
      margin-right: -6px;
      margin-left: -6px;
    }
  }
}
</style>
