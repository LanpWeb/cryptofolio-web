// @flow

import { takeEvery } from "redux-saga/effects";

import fetchTransactionsSaga from "ducks/transactions/sagas/fetchTransactionsSaga";

import { FETCH_TRANSACTIONS_REQUEST } from "ducks/transactions/const";

export function* watchTransactions(): mixed {
  yield takeEvery(FETCH_TRANSACTIONS_REQUEST, fetchTransactionsSaga);
}
