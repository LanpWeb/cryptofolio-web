// @flow

import { takeEvery, takeLatest } from "redux-saga/effects";

import tokenRefreshSaga from "ducks/auth/sagas/tokenRefreshSaga";
import silentTokenRefreshSaga from "ducks/auth/sagas/silentTokenRefreshSaga";
import fetchJWTDataSaga from "ducks/auth/sagas/fetchJWTDataSaga";
import signOutSaga from "ducks/auth/sagas/signOutSaga";

import {
  TOKEN_REFRESH_REQUEST,
  SET_SILENT_REFRESH,
  FETCH_JWT_DATA_REQUEST,
  SIGN_OUT_REQUEST,
} from "ducks/auth/const";

export function* watchAuth(): mixed {
  yield takeEvery(TOKEN_REFRESH_REQUEST, tokenRefreshSaga);
  yield takeEvery(FETCH_JWT_DATA_REQUEST, fetchJWTDataSaga);
  yield takeLatest(SET_SILENT_REFRESH, silentTokenRefreshSaga);
  yield takeLatest(SIGN_OUT_REQUEST, signOutSaga);
}
