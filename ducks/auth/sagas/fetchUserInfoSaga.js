// @flow

import axios from "axios";
import { put, call, select } from "redux-saga/effects";

import { apiURL } from "config";

import {
  FETCH_USER_INFO_START,
  FETCH_USER_INFO_SUCCESS,
  FETCH_USER_INFO_FAIL
} from "ducks/auth/const";
import { ADD_WATCHLIST } from "ducks/watchlist/const";

import { stateSelector } from "ducks/auth/selectors";
import type { UserInfoPayload } from "ducks/auth/types";

export default function* fetchUserInfoSaga({
  payload: {
    accessToken
  }
}: UserInfoPayload): Generator<any, any, any> {
  const state = yield select(stateSelector);

  if (state.progress) return true;

  yield put({ type: FETCH_USER_INFO_START });

  try {
    const options = {
      method: "get",
      url: `${apiURL}/user`,
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    };

    const res = yield call(axios, options);

    if (res && res.data) {
      const { watchlist, ...otherData } = res.data;
      yield put({ type: FETCH_USER_INFO_SUCCESS, payload: otherData });
      yield put({ type: ADD_WATCHLIST, payload: watchlist });
    }
  } catch (err) {
    console.log("Error:: ", err);

    yield put({ type: FETCH_USER_INFO_FAIL, payload: { error: err.message } });
  }
}
