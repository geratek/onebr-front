import { ActionTree } from 'vuex'

import BacteriaFilter from '@/modules/shared/entities/BacteriaFilter'
import BacteriaService from '@/modules/shared/services/BacteriaService'
import MapService from '@/modules/shared/services/MapService'
import { BacteriaState } from './state'

const actions: ActionTree<BacteriaState, unknown> = {
  async fetchCoordinates({ commit }, bacteria: string): Promise<void> {
    try {
      const { data } = await MapService.getCoordinates(bacteria)
      commit('setCoordinates', data)
    } catch (err) {
      console.error(err)
      throw err
    }
  },
  async fetchExperiments({ commit }, filter: BacteriaFilter): Promise<void> {
    commit('setFilter', filter)

    try {
      const { data } = await BacteriaService.getExperimentsPaginated(filter)
      commit('setExperiments', data.content)
      commit('setPageable', data.pageable)
    } catch (err) {
      console.error(err)
      throw err
    }
  },
  async fetchExperimentById({ commit }, id: number): Promise<void> {
    try {
      const { data } = await BacteriaService.getExperimentById(id)
      commit('setExperiment', data)
    } catch (err) {
      console.error(err)
      throw err
    }
  },
  async fetchSpecies({ commit }): Promise<void> {
    try {
      const { data } = await Promise.resolve({ data: [] })
      commit('setSpecies', data)
    } catch (err) {
      console.error(err)
      throw err
    }
  },
}

export default actions
