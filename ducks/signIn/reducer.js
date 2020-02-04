// @flow
import { handleActions } from "redux-actions";

import { SIGN_OUT_SUCCESS } from "ducks/auth/const";
import {
  SIGN_IN_START,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAIL
} from "./const";

import type { State } from "./types";

export const initialState: State = {
  progress: false,
  error: null
};

const signInReducer = handleActions(
  {
    [SIGN_IN_START]: () => ({
      progress: true,
      error: null
    }),

    [SIGN_IN_SUCCESS]: () => ({
      progress: false,
      error: null
    }),

    [SIGN_IN_FAIL]: (state: State, action) => ({
      progress: false,
      error: action.payload.error
    }),

    [SIGN_OUT_SUCCESS]: () => initialState,
  },
  initialState
);

export default signInReducer;
