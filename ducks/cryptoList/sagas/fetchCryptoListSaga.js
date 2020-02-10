// @flow

import axios from "axios";
import { put, call, select } from "redux-saga/effects";

import { apiURL } from "config";

import {
  FETCH_CRYPTO_LIST_START,
  FETCH_CRYPTO_LIST_SUCCESS,
  FETCH_CRYPTO_LIST_FAIL
} from "ducks/cryptoList/const";

import { stateSelector } from "ducks/cryptoList/selectors";
import type { CryptoListPayload } from "ducks/cryptoList/types";

export default function* fetchCryptoListSaga({
  payload: {
    start,
    limit
  }
}: CryptoListPayload): Generator<any, any, any> {
  const state = yield select(stateSelector);

  if (state.progress) return true;

  yield put({ type: FETCH_CRYPTO_LIST_START });

  try {
    const options = {
      method: "get",
      url: `${apiURL}/cryptocurrency/latest`,
      params: {
        start,
        limit
      }
    };

    const res = yield call(axios, options);

    if (res && res.data) {
      yield put({ type: FETCH_CRYPTO_LIST_SUCCESS, payload: res.data });
    }
  } catch (err) {
    console.log("Error:: ", err);

    yield put({ type: FETCH_CRYPTO_LIST_FAIL, payload: { error: err.response.data } });
  }
}
