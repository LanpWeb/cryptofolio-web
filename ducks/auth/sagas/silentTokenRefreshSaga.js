// @flow

import { fork, select, delay } from "redux-saga/effects";

import { stateSelector } from "ducks/auth/selectors";
import tokenRefreshSaga from "ducks/auth/sagas/tokenRefreshSaga";

export default function* silentTokenRefreshSaga(): Generator<any, any, any> {
  const state = yield select(stateSelector);

  if (state.jwt.exp !== null) {
    try {
      yield delay(state.jwt.exp * 1000 - Date.now() + 10000); // on 10 seconds earlier for server operations
      yield fork(tokenRefreshSaga, { payload: {} });
    } catch (err) {
      console.log("Error:: ", err);
    }
  } else {
    return true;
  }
}
