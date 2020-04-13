// @flow

import { takeEvery } from 'redux-saga/effects'

import fetchCryptoListSaga from 'ducks/cryptoList/sagas/fetchCryptoListSaga'
import fetchWatchlistSaga from 'ducks/cryptoList/sagas/fetchWatchlistSaga'

import {
  FETCH_CRYPTO_LIST_REQUEST,
  FETCH_WATCHLIST_REQUEST,
} from 'ducks/cryptoList/const'

export function* watchCryptoList(): mixed {
  yield takeEvery(FETCH_CRYPTO_LIST_REQUEST, fetchCryptoListSaga)
  yield takeEvery(FETCH_WATCHLIST_REQUEST, fetchWatchlistSaga)
}
