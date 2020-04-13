// @flow

import { takeEvery } from 'redux-saga/effects'

import fetchWatchlistSaga from 'ducks/watchlist/sagas/fetchWatchlistSaga'
import toggleWatchlistSaga from 'ducks/watchlist/sagas/toggleWatchlistSaga'

import {
  FETCH_WATCHLIST_REQUEST,
  TOGGLE_WATCHLIST_REQUEST,
} from 'ducks/watchlist/const'

export function* watchToggleWatchlist(): mixed {
  yield takeEvery(TOGGLE_WATCHLIST_REQUEST, toggleWatchlistSaga)
  yield takeEvery(FETCH_WATCHLIST_REQUEST, fetchWatchlistSaga)
}
