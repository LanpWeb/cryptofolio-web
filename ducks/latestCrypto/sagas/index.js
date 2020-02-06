// @flow

import { takeEvery } from "redux-saga/effects";

import latestCryptoSaga from "ducks/latestCrypto/sagas/latestCryptoSaga";

import { LATEST_CRYPTO_REQUEST } from "ducks/latestCrypto/const";

export function* watchLatestCrypto(): mixed {
  yield takeEvery(LATEST_CRYPTO_REQUEST, latestCryptoSaga);
}
