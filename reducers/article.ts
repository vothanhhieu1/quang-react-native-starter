import {
  COUNT,
  LIST,
  CREATE,
  UPDATE,
  SELECT,
  LOADING,
  REFRESH,
} from '@@/actions/article'
import _ from 'lodash'
import { LOGOUT } from '@@/actions/auth'

const initialState = {}

export default function (state: any = initialState, action: any) {
  switch (action.type) {
    case LOGOUT:
    case REFRESH: {
      return initialState
    }
    case LOADING: {
      return {
        ...state,
        loading: action.loading,
      }
    }
    case COUNT: {
      return {
        ...state,
        count: action.count,
      }
    }
    case LIST: {
      return {
        ...state,
        articles: action.articles,
        pages: action.pages,
        count: action.count !== undefined ? action.count : state.count,
      }
    }
    case CREATE: {
      return {
        ...state,
        pages: 0,
        count: 0,
      }
    }
    case UPDATE: {
      const index = _.findIndex(state.articles, ['id', action.article.id])
      if (index < 0) {
        return state
      }

      const articles = [...state.articles]
      articles[index] = action.article

      let current = state
      if (current && current.id == action.article.id) {
        current = { ...current, ...action.article }
      }

      return {
        ...state,
        articles,
        current,
      }
    }
    case SELECT: {
      return {
        ...state,
        current: action.article,
      }
    }
  }
  return state
}
