<template>
  <v-container experiment-table>
    <experiment-filter :isCovid="isCovid" />

    <v-data-table
      dense
      disable-pagination
      hide-default-footer
      class="--striped --clickable"
      mobile-breakpoint="0"
      v-model="selected"
      :options.sync="options"
      :server-items-length="experiments.length"
      :headers="headers"
      :items="experiments"
      @click:row="clickRow"
    >
      <template #item.identification="{ item }">
        <a @click.prevent.stop="showExperimentDetails(item.id)">
          {{ item.identification }}
        </a>
      </template>

      <template #item.host="{ item }">
        <span :class="{'font-italic': item.host !== 'NA' }">
          {{ item.host }}
        </span>
      </template>

      <template #item.resistome="{ item }">
        <a
          class="d-block text-truncate"
          style="max-width: 250px"
          v-if="item.resistome.toString()"
          @click.prevent.stop="showResistome(item.resistome)"
        >
          {{ item.resistome }}
        </a>
        <span v-else>
          -
        </span>
      </template>

      <template #body.append>
        <p
          v-intersect="{
            handler: onIntersect,
            options: {
              threshold: [0, 0.5, 1.0]
            }
          }"
        />
      </template>
    </v-data-table>

    <resistome-dialog v-model="resistomeDialog"/>

    <experiment-dialog v-model="experimentDialog"/>
  </v-container>
</template>

<script lang="ts">
import {
  Component, Watch, Vue,
} from 'vue-property-decorator'
import { DataTableHeader } from 'vuetify'
import { namespace } from 'vuex-class'

import ExperimentListItem from '@/modules/shared/entities/ExperimentListItem'
import Resistome from '@/modules/shared/entities/Resistome'
import BacteriaFilter from '@/modules/shared/entities/BacteriaFilter'
import { Pageable } from '@/modules/shared/entities/Pagination'

import Pagination from '@/modules/shared/components/Pagination.vue'
import ExperimentDialog from '../dialogs/ExperimentDialog.vue'
import ResistomeDialog from '../dialogs/ResistomeDialog.vue'
import ExperimentFilter from '../filter/ExperimentFilter.vue'

const BacteriaModule = namespace('bacteria')

@Component({
  components: {
    ExperimentDialog,
    ExperimentFilter,
    Pagination,
    ResistomeDialog,
  },
})
export default class ExperimentTable extends Vue {
  @BacteriaModule.State
  private readonly experiments!: ExperimentListItem[]

  @BacteriaModule.State
  private readonly pageable!: Pageable

  @BacteriaModule.State
  private readonly filter!: BacteriaFilter

  @BacteriaModule.Mutation
  private readonly setResistome!: (resistome: Resistome|null) => void

  @BacteriaModule.Mutation
  private readonly selectCoordinates!: (ids: number[]) => void

  @BacteriaModule.Action
  private readonly fetchExperiments!: (filter: BacteriaFilter) => Promise<void>

  @BacteriaModule.Action
  private readonly loadMoreExperiments!: (filter: BacteriaFilter) => Promise<void>

  @BacteriaModule.Action
  private readonly fetchExperimentById!: (id: number) => Promise<void>

  @Watch('selected')
  selectedChange(experiments: ExperimentListItem[]) {
    const ids = experiments.map(({ id }) => id)
    this.selectCoordinates(ids)
  }

  @Watch('filter')
  filterChange() {
    this.selected = []
    this.selectCoordinates([])
  }

  private resistomeDialog = false

  private experimentDialog = false

  private loading = false

  private selected: ExperimentListItem[] = []

  private get headers(): DataTableHeader[] {
    const getText = (key: string) => this.$i18n.t(`bacteria.columns.${key}`) as string

    const headers: DataTableHeader[] = [
      {
        text: getText('id'),
        value: 'identification',
      },
      {
        text: getText('city'),
        value: 'cityName',
      },
      {
        text: getText('date'),
        value: 'date',
      },
      {
        text: getText('origin'),
        value: (this.$i18n.locale === 'en') ? 'originNameEn' : 'originNamePt',
      },
      {
        text: getText('source'),
        value: (this.$i18n.locale === 'en') ? 'sourceNameEn' : 'sourceNamePt',
      },
      {
        text: getText('host'),
        value: 'host',
      },
      {
        text: getText('st'),
        value: 'st',
      },
    ]

    if (this.isCovid) {
      headers.splice(1, 0, {
        text: getText('specie'),
        value: 'subSpecieName',
      })
    } else {
      headers.push({
        text: getText('resistance_genes'),
        value: 'resistome',
        sortable: false,
      })
    }

    return headers
  }

  private get options() {
    const [sortBy, order] = this.filter.sort

    return {
      sortBy: [sortBy],
      sortDesc: [order === 'desc'],
    }
  }

  private set options(options) {
    if (!this.filter.type) return

    const { sortBy: [column], sortDesc: [isDesc] } = options
    let sort = new Array<string>()

    if (column) {
      sort = [column, isDesc ? 'desc' : 'asc']
    }

    const newFilter = this.filter.copyWith({ sort })
    this.fetchExperiments(newFilter)
  }

  private get isCovid(): boolean {
    const { name } = this.$route.params

    return name === 'COVID'
  }

  private showResistome(resistome: Resistome) {
    this.setResistome(resistome)
    this.resistomeDialog = true
  }

  private async showExperimentDetails(id: number) {
    try {
      await this.fetchExperimentById(id)
      this.experimentDialog = true

      if (this.$vuetify.breakpoint.smAndDown) {
        setTimeout(() => {
          window.print()
          setTimeout(() => { this.experimentDialog = false }, 1000)
        }, 750)
      }

      this.$ga.page(`${this.$router.currentRoute.path}/view`)
    } catch (err) {
      console.error(err)
    }
  }

  private onIntersect() {
    const nextPage = this.filter.page + 1

    if (!this.loading && this.pageable && (nextPage <= this.pageable.totalPages)) {
      this.loading = true
      const newFilter = this.filter.copyWith({ page: nextPage })

      this.loadMoreExperiments(newFilter).finally(() => {
        this.loading = false
      })
    }
  }

  private clickRow(_: unknown, { select, isSelected }: { select: Function; isSelected: boolean }) {
    select(!isSelected)
  }
}
</script>

<style lang="scss" scoped>
.experiment-table {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow: hidden;
  padding: 0;

  .v-data-table {
    flex-grow: 1;
    overflow-y: scroll;
  }

  .pagination {
    margin: 30px auto 20px;
  }

  &::v-deep table {
    min-width: 1100px;
  }
}
</style>
