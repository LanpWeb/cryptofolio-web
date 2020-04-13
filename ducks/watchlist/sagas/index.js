// @flow

import { takeEvery } from 'redux-saga/effects'

import toggleWatchlistSaga from 'ducks/watchlist/sagas/toggleWatchlistSaga'

import { TOGGLE_WATCHLIST_REQUEST } from 'ducks/watchlist/const'

export function* watchToggleWatchlist(): mixed {
  yield takeEvery(TOGGLE_WATCHLIST_REQUEST, toggleWatchlistSaga)
}
