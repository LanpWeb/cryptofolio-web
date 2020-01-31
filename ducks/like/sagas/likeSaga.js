// @flow

import { put, select, delay } from "redux-saga/effects";
import {
  LIKE_START,
  LIKE_SUCCESS,
  LIKE_FAIL,
} from "ducks/like/const";
import { stateSelector } from "ducks/like/selectors";

export default function* likeSaga(): Generator<any, any, any> {
  const state = yield select(stateSelector);

  if (state.progress) return true;

  yield put({
    type: LIKE_START
  });

  try {
    yield delay(500);
    yield put({
      type: LIKE_SUCCESS
    });
  } catch (e) {
    yield put({
      type: LIKE_FAIL,
      payload: { error: e.message }
    });
  }
}
