// @flow
import { handleActions } from "redux-actions";

import { SIGN_OUT_SUCCESS } from "ducks/auth/const";
import {
  CRYPTO_GLOBAL_STATS_START,
  CRYPTO_GLOBAL_STATS_SUCCESS,
  CRYPTO_GLOBAL_STATS_FAIL
} from "ducks/cryptoGlobalStats/const";

import type { State } from "ducks/cryptoGlobalStats/types";

export const initialState: State = {
  data: null,
  progress: false,
  error: null,
  loaded: false
};

const cryptoGlobalStatsReducer = handleActions(
  {
    [CRYPTO_GLOBAL_STATS_START]: (state: State) => ({
      ...state,
      progress: true,
      error: null
    }),

    [CRYPTO_GLOBAL_STATS_SUCCESS]: (state: State, action) => ({
      data: action.payload,
      progress: false,
      error: null,
      loaded: true
    }),

    [CRYPTO_GLOBAL_STATS_FAIL]: (state: State, action) => ({
      ...state,
      progress: false,
      error: action.payload.error
    }),

    [SIGN_OUT_SUCCESS]: () => initialState,
  },
  initialState
);

export default cryptoGlobalStatsReducer;
