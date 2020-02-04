// @flow

import { takeEvery } from "redux-saga/effects";

import signUpSaga from "ducks/signUp/sagas/signUpSaga";

import { SIGN_UP_REQUEST } from "ducks/signUp/const";

export function* watchSignUp(): mixed {
  yield takeEvery(SIGN_UP_REQUEST, signUpSaga);
}
