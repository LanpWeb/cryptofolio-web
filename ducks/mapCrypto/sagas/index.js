// @flow

import { takeEvery } from "redux-saga/effects";

import mapCryptoSaga from "ducks/mapCrypto/sagas/mapCryptoSaga";

import { MAP_CRYPTO_REQUEST } from "ducks/mapCrypto/const";

export function* watchMapCrypto(): mixed {
  yield takeEvery(MAP_CRYPTO_REQUEST, mapCryptoSaga);
}
