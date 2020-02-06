// @flow

import { takeEvery, takeLatest } from "redux-saga/effects";

import fetchUserInfoSaga from "ducks/auth/sagas/fetchUserInfoSaga";
import tokenRefreshSaga from "ducks/auth/sagas/tokenRefreshSaga";
import silentTokenRefreshSaga from "ducks/auth/sagas/silentTokenRefreshSaga";
import fetchJWTDataSaga from "ducks/auth/sagas/fetchJWTDataSaga";
import signOutSaga from "ducks/auth/sagas/signOutSaga";

import {
  FETCH_USER_INFO_REQUEST,
  TOKEN_REFRESH_REQUEST,
  SET_SILENT_REFRESH,
  FETCH_JWT_DATA_REQUEST,
  SIGN_OUT_REQUEST,
} from "ducks/auth/const";

export function* watchAuth(): mixed {
  yield takeEvery(FETCH_USER_INFO_REQUEST, fetchUserInfoSaga);
  yield takeEvery(TOKEN_REFRESH_REQUEST, tokenRefreshSaga);
  yield takeEvery(FETCH_JWT_DATA_REQUEST, fetchJWTDataSaga);
  yield takeLatest(SET_SILENT_REFRESH, silentTokenRefreshSaga);
  yield takeLatest(SIGN_OUT_REQUEST, signOutSaga);
}
