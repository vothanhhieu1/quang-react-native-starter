import { all } from 'redux-saga/effects'
import artileSagas from './article'

export default function* rootSaga() {
  yield all([artileSagas()])
}
