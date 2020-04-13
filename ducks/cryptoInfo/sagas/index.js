// @flow

import { takeEvery } from 'redux-saga/effects'

import fetchCryptoInfoSaga from 'ducks/cryptoInfo/sagas/fetchCryptoInfoSaga'

import { FETCH_CRYPTO_INFO_REQUEST } from 'ducks/cryptoInfo/const'

export function* watchCryptoInfo(): mixed {
  yield takeEvery(FETCH_CRYPTO_INFO_REQUEST, fetchCryptoInfoSaga)
}
