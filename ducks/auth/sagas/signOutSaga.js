// @flow

import axios from "axios";
import { call, put } from "redux-saga/effects";

import { apiURL } from "config";
import {
  SIGN_OUT_START,
  SIGN_OUT_SUCCESS,
  SIGN_OUT_FAIL
} from "ducks/auth/const";
import redirect from "server/redirect";

export default function* signOutSaga(): Generator<any, any, any> {
  try {
    yield put({ type: SIGN_OUT_START });

    const options = {
      method: "post",
      url: `${apiURL}/logout`
    };

    yield call(axios, options);
    yield put({ type: SIGN_OUT_SUCCESS });

    // to support logging out from all windows
    if (typeof window !== "undefined") {
      window.localStorage.setItem("logout", Date.now());

      redirect("/sign-in");
    }
  } catch (err) {
    console.log("Error:: ", err);

    yield put({ type: SIGN_OUT_FAIL });
  }
}
