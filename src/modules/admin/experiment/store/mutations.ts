import { MutationTree } from 'vuex'

import BacteriaFilter from '@/modules/shared/entities/BacteriaFilter'
import ExperimentListItem from '@/modules/shared/entities/ExperimentListItem'
import BacteriaFilterItem from '@/modules/shared/entities/BacteriaFilterItem'
import ExperimentModel from '@/modules/shared/entities/form-models/Experiment'

import { Pageable } from '@/modules/shared/entities/Pagination'
import { ExperimentState } from './state'

const mutations: MutationTree<ExperimentState> = {
  setExperiments(state, experiments: ExperimentListItem[]) {
    state.experiments = experiments
  },
  setFilter(state, filter: BacteriaFilter) {
    state.filter = filter
  },
  setPageable(state, pageable: Pageable) {
    state.pageable = pageable
  },
  setFormModel(state, formModel: ExperimentModel | null) {
    state.formModel = formModel
  },
  setSpecies(state, species: BacteriaFilterItem[]) {
    state.species = species
  },
  setPlasmidome(state, plasmidome: BacteriaFilterItem[]) {
    state.plasmidome = plasmidome
  },
  setAntigenH(state, antigenH: BacteriaFilterItem[]) {
    state.antigenH = antigenH
  },
  setAntigenO(state, antigenO: BacteriaFilterItem[]) {
    state.antigenO = antigenO
  },
  setVirulome(state, virulome: BacteriaFilterItem[]) {
    state.virulome = virulome
  },
  setHeavyMetal(state, heavyMetal: BacteriaFilterItem[]) {
    state.heavyMetal = heavyMetal
  },
  setSerovar(state, serovar: BacteriaFilterItem[]) {
    state.serovar = serovar
  },
  setClermontTyping(state, clermontTyping: BacteriaFilterItem[]) {
    state.clermontTyping = clermontTyping
  },
  setSequencer(state, sequencer: BacteriaFilterItem[]) {
    state.sequencer = sequencer
  },
  setCountries(state, countries: BacteriaFilterItem[]) {
    state.countries = countries
  },
  setCities(state, cities: BacteriaFilterItem[]) {
    state.cities = cities
  },
  setRegions(state, regions: BacteriaFilterItem[]) {
    state.regions = regions
  },
  setSources(state, source: BacteriaFilterItem[]) {
    state.source = source
  },
  setOrigin(state, origin: BacteriaFilterItem[]) {
    state.origin = origin
  },
  setSt(state, st: string[]) {
    state.st = st
  },
  setEffluxPump(state, effluxPump: BacteriaFilterItem[]) {
    state.effluxPump = effluxPump
  },
  setSccMecElement(state, sccMecElement: BacteriaFilterItem[]) {
    state.sccMecElement = sccMecElement
  },
  setSAureusSpaType(state, sAureusSpaType: string[]) {
    state.sAureusSpaType = sAureusSpaType
  },
}

export default mutations
