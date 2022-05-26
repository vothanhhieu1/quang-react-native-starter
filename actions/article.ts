import { Article } from '@@/types'

export const COUNT = 'ARTICLE/COUNT'
export const LIST = 'ARTICLE/LIST'
export const CREATE = 'ARTICLE/CREATE'
export const UPDATE = 'ARTICLE/UPDATE'
export const REMOVE = 'ARTICLE/REMOVE'
export const SELECT = 'ARTICLE/SELECT'
export const LOADING = 'ARTICLE/LOADING'
export const LOAD_MORE = 'ARTICLE/LOAD_MORE'
export const LOAD_FIRST = 'ARTICLE/LOAD_FIRST'
export const REFRESH = 'ARTICLE/REFRESH'

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

export const list = (articles: Article[], pages: number, count?: number) => {
  return {
    type: LIST,
    articles,
    pages,
    count,
  }
}

export const remove = (article?: Article) => {
  return {
    type: REMOVE,
    article,
  }
}

export const select = (article?: Article) => {
  return {
    type: SELECT,
    article,
  }
}

export const create = (article: Article) => {
  return {
    type: CREATE,
    article,
  }
}

export const update = (article: Article) => {
  return {
    type: UPDATE,
    article,
  }
}
