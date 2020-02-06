// @flow

import axios from "axios";
import { put, call, select } from "redux-saga/effects";

import { apiURL } from "config";

import {
  LATEST_CRYPTO_START,
  LATEST_CRYPTO_SUCCESS,
  LATEST_CRYPTO_FAIL
} from "ducks/latestCrypto/const";

import { stateSelector } from "ducks/latestCrypto/selectors";
import type { LatestCryptoPayload } from "ducks/latestCrypto/types";

export default function* latestCryptoSaga({
  payload: {
    start,
    limit
  }
}: LatestCryptoPayload): Generator<any, any, any> {
  const state = yield select(stateSelector);

  if (state.progress) return true;

  yield put({ type: LATEST_CRYPTO_START });

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
      yield put({ type: LATEST_CRYPTO_SUCCESS, payload: res.data });
    }
  } catch (err) {
    console.log("Error:: ", err);

    yield put({ type: LATEST_CRYPTO_FAIL, payload: { error: err.response.data } });
  }
}
