// @flow

import axios from "axios";
import { call, put, select } from "redux-saga/effects";

import { apiURL } from "config";
import {
  SIGN_OUT_START,
  SIGN_OUT_SUCCESS,
  SIGN_OUT_FAIL
} from "ducks/auth/const";
import { FETCH_CRYPTO_LIST_REQUEST } from "ducks/cryptoList/const";
import { stateSelector } from "ducks/cryptoList/selectors";
import redirect from "server/redirect";

export default function* signOutSaga(): Generator<any, any, any> {
  const state = yield select(stateSelector);

  try {
    yield put({ type: SIGN_OUT_START });

    const options = {
      method: "post",
      url: `${apiURL}/logout`
    };

    yield call(axios, options);
    if (state.isWatchlist) {
      yield put({ type: FETCH_CRYPTO_LIST_REQUEST, payload: { start: state.start, limit: state.limit } });
    }
    yield put({ type: SIGN_OUT_SUCCESS });

    // to support logging out from all windows
    if (typeof window !== "undefined") {
      window.localStorage.setItem("logout", Date.now());

      redirect("/");
    }
  } catch (err) {
    console.log("Error:: ", err);

    yield put({ type: SIGN_OUT_FAIL });
  }
}
