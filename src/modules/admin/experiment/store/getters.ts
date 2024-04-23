import { GetterTree } from 'vuex'

import { ExperimentState } from './state'

function createOptions(length: number, pad: string) {
  return Array.from({ length }, (_, index) => `${pad}${index + 1}`).concat(['NA', '-'])
}

const getters: GetterTree<ExperimentState, unknown> = {
  experiments(state) {
    return state.experiments
  },
  filter(state) {
    return state.filter
  },
  pageable(state) {
    return state.pageable
  },
  formModel(state) {
    return state.formModel
  },
  species(state) {
    return state.species
  },
  plasmidome(state) {
    return state.plasmidome
  },
  antigenH(state) {
    return state.antigenH
  },
  antigenO(state) {
    return state.antigenO
  },
  virulome(state) {
    return state.virulome
  },
  heavyMetal(state) {
    return state.heavyMetal
  },
  serovar(state) {
    return state.serovar
  },
  clermontTyping(state) {
    return state.clermontTyping
  },
  sequencer(state) {
    return state.sequencer
  },
  st(state) {
    return state.st
  },
  source(state) {
    return state.source
  },
  origin(state) {
    return state.origin
  },
  countries(state) {
    return state.countries
  },
  cities(state) {
    return state.cities
  },
  regions(state) {
    return state.regions
  },
  effluxPump(state) {
    return state.effluxPump
  },
  sccMecElement(state) {
    return state.sccMecElement
  },
  sAureusSpaType(state) {
    return state.sAureusSpaType
  },
  kLocus() {
    return createOptions(1250, 'K')
  },
  wzi() {
    return createOptions(1500, 'wzi_')
  },
  wzc() {
    return createOptions(1500, 'wzc_')
  },
  fimType() {
    return createOptions(500, 'fimH').concat(['fimH2184'])
  },
}

export default getters
