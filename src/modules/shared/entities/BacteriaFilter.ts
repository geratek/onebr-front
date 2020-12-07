interface BacteriaFilterInterface {
  type?: string;
  ids?: number[];
  searchTerm?: string;
  resistomes?: number[];
  subSpecieIds?: number[];
  startDate?: string;
  endDate?: string;
  sort?: string[];
  page?: number;
  size?: number;
}

class BacteriaFilter implements BacteriaFilterInterface {
  type?: string

  ids?: number[]

  searchTerm?: string

  resistomes?: number[]

  subSpecieIds?: number[]

  startDate?: string

  endDate?: string

  sort = ['identification', 'asc']

  page = 1

  size = 10

  constructor(filter?: BacteriaFilterInterface) {
    Object.assign(this, filter)
  }

  static empty() {
    return new BacteriaFilter()
  }

  copyWith(filter: BacteriaFilterInterface) {
    return new BacteriaFilter({ ...this, ...filter })
  }

  toServer() {
    const {
      startDate, endDate, resistomes, sort, page, ids, subSpecieIds, ...rest
    } = this

    return {
      ...rest,
      yearStart: startDate?.slice(0, 4),
      yearEnd: endDate?.slice(0, 4),
      resistomes: resistomes?.join(),
      sort: sort?.join(),
      ids: ids?.join(),
      page: page - 1,
      subSpecieIds: subSpecieIds?.join(),
    }
  }
}

export default BacteriaFilter
