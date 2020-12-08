import { MutationTree } from 'vuex'

import BacteriaFilter from '@/modules/shared/entities/BacteriaFilter'
import Coordinate from '@/modules/shared/entities/Coordinate'
import Experiment from '@/modules/shared/entities/Experiment'
import ExperimentListItem from '@/modules/shared/entities/ExperimentListItem'
import Resistome from '@/modules/shared/entities/Resistome'

import { Pageable } from '@/modules/shared/entities/Pagination'
import { BacteriaState } from './state'

const mutations: MutationTree<BacteriaState> = {
  setCoordinates(state, coordinates: Coordinate[]) {
    state.coordinates = coordinates
  },
  setExperiments(state, experiments: ExperimentListItem[]) {
    state.experiments = experiments
  },
  setResistome(state, resistome: Resistome | null) {
    state.resistome = resistome
  },
  setExperiment(state, experiment: Experiment) {
    state.experiment = experiment
  },
  setFilter(state, filter: BacteriaFilter) {
    state.filter = filter
  },
  setPageable(state, pageable: Pageable) {
    state.pageable = pageable
  },
  selectCoordinates(state, ids: number[]) {
    /* eslint-disable no-param-reassign */
    state.coordinates.forEach((coordinate) => {
      coordinate.selected = ids.includes(coordinate.id)
    })
  },
}

export default mutations
