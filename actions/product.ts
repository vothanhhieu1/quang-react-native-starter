import { Product } from '@@/types'

export const COUNT = 'PRODUCT/COUNT'
export const LIST = 'PRODUCT/LIST'
export const CREATE = 'PRODUCT/CREATE'
export const UPDATE = 'PRODUCT/UPDATE'
export const REMOVE = 'PRODUCT/REMOVE'
export const SELECT = 'PRODUCT/SELECT'
export const LOADING = 'PRODUCT/LOADING'
export const LOAD_MORE = 'PRODUCT/LOAD_MORE'
export const LOAD_FIRST = 'PRODUCT/LOAD_FIRST'
export const REFRESH = 'PRODUCT/REFRESH'

export const loadMore = () => {
  return {
    type: LOAD_MORE,
  }
}

export const refresh = () => {
  return {
    type: REFRESH,
  }
}

export const count = (count: number) => {
  return {
    type: COUNT,
    count,
  }
}

export const loadFirst = () => {
  return {
    type: LOAD_FIRST,
  }
}

export const loading = (loading: boolean) => {
  return {
    type: LOADING,
    loading,
  }
}

export const list = (products: Product[], pages: number, count?: number) => {
  return {
    type: LIST,
    products,
    pages,
    count,
  }
}

export const remove = (product?: Product) => {
  return {
    type: REMOVE,
    product,
  }
}

export const select = (product?: Product) => {
  return {
    type: SELECT,
    product,
  }
}

export const create = (product: Product) => {
  return {
    type: CREATE,
    product,
  }
}

export const update = (product: Product) => {
  return {
    type: UPDATE,
    product,
  }
}
