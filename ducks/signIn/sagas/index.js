// @flow

import { takeEvery } from "redux-saga/effects";

import signInSaga from "ducks/signIn/sagas/signInSaga";

import { SIGN_IN_REQUEST } from "ducks/signIn/const";

export function* watchSignIn(): mixed {
  yield takeEvery(SIGN_IN_REQUEST, signInSaga);
}
