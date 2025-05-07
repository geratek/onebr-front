import { MutationTree } from 'vuex'

import BacteriaFilterItem from '@/modules/shared/entities/BacteriaFilterItem'

import { SharedState } from './state'

const mutations: MutationTree<SharedState> = {
  setSpecies(state, species: BacteriaFilterItem[]) {
    state.species = species
  },
  setTotalViews(state, totalViews: number) {
    state.totalViews = totalViews
  },
}

export default mutations
