// @flow

import axios from "axios";
import { put, call, select } from "redux-saga/effects";

import { apiURL } from "config";

import {
  FETCH_JWT_DATA_START,
  FETCH_JWT_DATA_SUCCESS,
  FETCH_JWT_DATA_FAIL,
  SET_SILENT_REFRESH,
  SILENT_REFRESH_TO_SET
} from "ducks/auth/const";

import { stateSelector } from "ducks/auth/selectors";
import type { JWTDataPayload } from "ducks/auth/types";

export default function* fetchJWTDataSaga({
  payload: {
    isServer = false,
    accessToken
  }
}: JWTDataPayload): Generator<any, any, any> {
  const state = yield select(stateSelector);

  if (state.progress) return true;

  yield put({ type: FETCH_JWT_DATA_START });

  try {
    const options = {
      method: "post",
      url: `${apiURL}/verify-jwt`,
      data: {
        accessToken
      }
    };

    const res = yield call(axios, options);

    if (res && res.data) {
      yield put({ type: FETCH_JWT_DATA_SUCCESS, payload: { accessToken, ...res.data } });

      if (!isServer) {
        yield put({ type: SET_SILENT_REFRESH });
      } else {
        // Tells browser that page was rendered using SSR
        // and he needs to setSilentRefresh after window will be loaded
        yield put({ type: SILENT_REFRESH_TO_SET });
      }
    }
  } catch (err) {
    console.log("Error:: ", err);

    yield put({ type: FETCH_JWT_DATA_FAIL, payload: { error: err.message } });
  }
}
