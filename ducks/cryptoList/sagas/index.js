// @flow

import { takeEvery } from "redux-saga/effects";

import fetchCryptoListSaga from "ducks/cryptoList/sagas/fetchCryptoListSaga";

import { FETCH_CRYPTO_LIST_REQUEST } from "ducks/cryptoList/const";

export function* watchCryptoList(): mixed {
  yield takeEvery(FETCH_CRYPTO_LIST_REQUEST, fetchCryptoListSaga);
}
