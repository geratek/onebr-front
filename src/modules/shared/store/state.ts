import Bacteria from '@/modules/shared/entities/Bacteria'
import BacteriaFilterItem from '@/modules/shared/entities/BacteriaFilterItem'

export interface SharedState {
  bacteria: Bacteria[];
  species: BacteriaFilterItem[];
  totalViews: number;
}

const state: SharedState = {
  bacteria: [
    Bacteria.fromJson({
      image: '/bacteria/ecbr.png',
      name: 'EcBr',
      origin: 'Brazilian Database',
      scientificName: 'Escherichia coli',
      type: 'EC_BR',
    }),
    Bacteria.fromJson({
      image: 'bacteria/kpbr.png',
      name: 'KpBr',
      origin: 'Brazilian Database',
      scientificName: 'Klebsiella pneumoniae',
      type: 'KP_BR',
    }),
    Bacteria.fromJson({
      image: 'bacteria/sebr.png',
      name: 'SeBr',
      origin: 'Brazilian Database',
      scientificName: 'Salmonella enterica',
      type: 'SE_BR',
    }),
    Bacteria.fromJson({
      image: 'bacteria/pabr.png',
      name: 'PaBr',
      origin: 'Brazilian Database',
      scientificName: 'Pseudomonas aeruginosa',
      type: 'PA_BR',
    }),
    Bacteria.fromJson({
      image: '/bacteria/sabr.png',
      name: 'SaBr',
      origin: 'Brazilian Database',
      scientificName: 'Staphylococcus aureus',
      type: 'SA_BR',
    }),
    Bacteria.fromJson({
      image: '/bacteria/efbr.png',
      name: 'EfBr',
      origin: 'Brazilian Database',
      scientificName: 'Enterococcus spp',
      type: 'EF_SPP_BR',
    }),
    Bacteria.fromJson({
      image: '/bacteria/eccbr.png',
      name: 'EccBr',
      origin: 'Brazilian Database',
      scientificName: 'Enterobacter cloacae complex',
      type: 'ECC_BR',
    }),
    Bacteria.fromJson({
      image: 'bacteria/covid.png',
      name: 'COVID',
      origin: 'Brazilian Database',
      scientificName: 'COVID19',
      type: 'CV_19',
    }),
  ],
  species: [],
  totalViews: 0,
}

export default state
