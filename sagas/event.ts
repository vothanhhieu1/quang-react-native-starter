import { select, put, takeEvery, all } from 'redux-saga/effects'
import * as eventActions from '@@/actions/event'
import { apiDelete, apiGet } from '@@/libs/api'
import { alert } from '@@/components'

// https://realworld-docs.netlify.app/docs/specs/backend-specs/endpoints#list-events
const pageSize = 10

function* loadFirst(): any {
  try {
    yield put(eventActions.loading(true))
    const result = yield apiGet('/events', { limit: pageSize })
    yield put(eventActions.list(result.events, 1, result.eventsCount))
  } catch (e: any) {
    yield alert({
      title: 'Load event error',
      content: `${e.message || e}`,
    })
  } finally {
    yield put(eventActions.loading(false))
  }
}

function* refresh() {
  try {
    yield put(eventActions.loadFirst())
  } catch (e) {
    console.log('[event][refresh] error', e)
  }
}

function* loadMore(): any {
  try {
    const { pages, events, count } = yield select(state => state.event)
    if (!events || events.length >= count) {
      return
    }

    yield put(eventActions.loading(true))

    const result = yield apiGet('/events', {
      offset: events.length,
      limit: pageSize,
    })
    yield put(
      eventActions.list([...(events || []), ...result], pages + 1, count),
    )
  } catch (e: any) {
    yield alert({
      title: 'Load events error',
      content: `${e.message || e}`,
    })
  } finally {
    yield put(eventActions.loading(false))
  }
}

function* remove(action: any) {
  try {
    const { event } = action
    yield put(eventActions.loading(true))
    yield apiDelete(`/events/${event.id}`, {})
    yield put(eventActions.select(undefined))
    yield put(eventActions.loadFirst())
  } catch (e: any) {
    yield alert({
      title: 'Delete event error',
      content: `${e.message || e}`,
    })
  } finally {
    yield put(eventActions.loading(false))
  }
}

export default function* () {
  yield all([
    takeEvery(eventActions.LOAD_FIRST, loadFirst),
    takeEvery(eventActions.LOAD_MORE, loadMore),
    takeEvery(eventActions.REFRESH, refresh),
    takeEvery(eventActions.REMOVE, remove),
  ])
}
