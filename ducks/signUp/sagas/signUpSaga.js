// @flow

import axios from "axios";
import redirect from "server/redirect";
import { put, call, select } from "redux-saga/effects";

import { apiURL } from "config";

import {
  SIGN_UP_START,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAIL
} from "ducks/signUp/const";

import { stateSelector } from "ducks/signUp/selectors";
import type { SignUpPayload } from "ducks/signUp/types";

import fetchJWTDataSaga from "ducks/auth/sagas/fetchJWTDataSaga";

export default function* signUpSaga({
  payload: {
    email,
    password
  }
}: SignUpPayload): Generator<any, any, any> {
  const state = yield select(stateSelector);

  if (state.progress) return true;

  yield put({ type: SIGN_UP_START });

  try {
    const options = {
      method: "post",
      url: `${apiURL}/sign-up`,
      data: {
        email,
        password
      }
    };

    const res = yield call(axios, options);

    if (res && res.data) {
      yield put({ type: SIGN_UP_SUCCESS });
      yield call(fetchJWTDataSaga, { payload: { accessToken: res.data.accessToken } });

      redirect("/app");
    }
  } catch (err) {
    console.log("Error:: ", err);

    yield put({ type: SIGN_UP_FAIL, payload: { error: err.response.data } });
  }
}
