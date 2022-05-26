import { select, put, takeEvery, all } from 'redux-saga/effects'
import * as articleActions from '@@/actions/article'
import { apiDelete, apiGet } from '@@/libs/api'
import { alert } from '@@/components'

// https://realworld-docs.netlify.app/docs/specs/backend-specs/endpoints#list-articles
const pageSize = 10

function* loadFirst(): any {
  try {
    yield put(articleActions.loading(true))
    const result = yield apiGet('/articles', { limit: pageSize })
    yield put(articleActions.list(result.articles, 1, result.articlesCount))
  } catch (e: any) {
    yield alert({
      title: 'Load article error',
      content: `${e.message || e}`,
    })
  } finally {
    yield put(articleActions.loading(false))
  }
}

function* refresh() {
  try {
    yield put(articleActions.loadFirst())
  } catch (e) {
    console.log('[article][refresh] error', e)
  }
}

function* loadMore(): any {
  try {
    const { pages, articles, count } = yield select(state => state.article)
    if (!articles || articles.length >= count) {
      return
    }

    yield put(articleActions.loading(true))

    const result = yield apiGet('/articles', {
      offset: articles.length,
      limit: pageSize,
    })
    yield put(
      articleActions.list([...(articles || []), ...result], pages + 1, count),
    )
  } catch (e: any) {
    yield alert({
      title: 'Load articles error',
      content: `${e.message || e}`,
    })
  } finally {
    yield put(articleActions.loading(false))
  }
}

function* remove(action: any) {
  try {
    const { article } = action
    yield put(articleActions.loading(true))
    yield apiDelete(`/articles/${article.id}`, {})
    yield put(articleActions.select(undefined))
    yield put(articleActions.loadFirst())
  } catch (e: any) {
    yield alert({
      title: 'Delete article error',
      content: `${e.message || e}`,
    })
  } finally {
    yield put(articleActions.loading(false))
  }
}

export default function* () {
  yield all([
    takeEvery(articleActions.LOAD_FIRST, loadFirst),
    takeEvery(articleActions.LOAD_MORE, loadMore),
    takeEvery(articleActions.REFRESH, refresh),
    takeEvery(articleActions.REMOVE, remove),
  ])
}
