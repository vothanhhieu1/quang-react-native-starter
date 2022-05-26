import { Event } from '@@/types'

export const COUNT = 'EVENT/COUNT'
export const LIST = 'EVENT/LIST'
export const CREATE = 'EVENT/CREATE'
export const UPDATE = 'EVENT/UPDATE'
export const REMOVE = 'EVENT/REMOVE'
export const SELECT = 'EVENT/SELECT'
export const LOADING = 'EVENT/LOADING'
export const LOAD_MORE = 'EVENT/LOAD_MORE'
export const LOAD_FIRST = 'EVENT/LOAD_FIRST'
export const REFRESH = 'EVENT/REFRESH'

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

export const list = (events: Event[], pages: number, count?: number) => {
  return {
    type: LIST,
    events,
    pages,
    count,
  }
}

export const remove = (event?: Event) => {
  return {
    type: REMOVE,
    event,
  }
}

export const select = (event?: Event) => {
  return {
    type: SELECT,
    event,
  }
}

export const create = (event: Event) => {
  return {
    type: CREATE,
    event,
  }
}

export const update = (event: Event) => {
  return {
    type: UPDATE,
    event,
  }
}
