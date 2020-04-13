// @flow

import { takeEvery } from 'redux-saga/effects'

import cryptoGlobalStatsSaga from 'ducks/cryptoGlobalStats/sagas/cryptoGlobalStatsSaga'

import { CRYPTO_GLOBAL_STATS_REQUEST } from 'ducks/cryptoGlobalStats/const'

export function* watchCryptoGlobalStats(): mixed {
  yield takeEvery(CRYPTO_GLOBAL_STATS_REQUEST, cryptoGlobalStatsSaga)
}
