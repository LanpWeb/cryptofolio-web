// @flow
import { handleActions } from "redux-actions";

import { SIGN_OUT_SUCCESS } from "ducks/auth/const";
import {
  SIGN_UP_START,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAIL
} from "./const";

import type { State } from "./types";

export const initialState: State = {
  progress: false,
  error: null
};

const signUpReducer = handleActions(
  {
    [SIGN_UP_START]: () => ({
      progress: true,
      error: null
    }),

    [SIGN_UP_SUCCESS]: () => ({
      progress: false,
      error: null
    }),

    [SIGN_UP_FAIL]: (state: State, action) => ({
      progress: false,
      error: action.payload.error
    }),

    [SIGN_OUT_SUCCESS]: () => initialState,
  },
  initialState
);

export default signUpReducer;
