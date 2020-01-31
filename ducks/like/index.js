// @flow

import { takeEvery } from "redux-saga/effects";
import { createAction, handleActions } from "redux-actions";

// *** Sagas
import likeSaga from "./sagas/likeSaga";

// *** Constants
import {
  LIKE_REQUEST,
  LIKE_START,
  LIKE_SUCCESS,
  LIKE_FAIL,
} from "./const";

// *** Types
import type { State } from "./types";

/**
 * Reducer
 * */
export const initialState: State = {
  likes: 0,
  progress: false,
  error: null
};

const likeReducer = handleActions(
  {
    [LIKE_START]: (state: State) => ({
      ...state,
      progress: true
    }),
    [LIKE_SUCCESS]: (
      state: State
    ) => ({
      ...initialState,
      likes: state.likes + 1,
      progress: false
    }),
    [LIKE_FAIL]: (
      state: State,
      action
    ) => ({
      ...state,
      progress: false,
      error: action.payload.error
    })
  },
  initialState
);

export default likeReducer;

/**
 * Action Creators
 * */
export const onLike = createAction(LIKE_REQUEST);

/**
 * Sagas
 * */
export function* watchLike(): mixed {
  yield takeEvery(LIKE_REQUEST, likeSaga);
}
