// @flow
import { handleActions } from "redux-actions";

import {
  LATEST_CRYPTO_START,
  LATEST_CRYPTO_SUCCESS,
  LATEST_CRYPTO_FAIL
} from "./const";

import type { State } from "./types";

export const initialState: State = {
  latestCrypto: [],
  start: 1,
  limit: 10,
  loaded: false,
  progress: false,
  error: null
};

const latestCryptoReducer = handleActions(
  {
    [LATEST_CRYPTO_START]: (state: State) => ({
      ...state,
      progress: true,
      error: null
    }),

    [LATEST_CRYPTO_SUCCESS]: (state: State, action) => ({
      ...state,
      start: state.start + state.limit,
      latestCrypto: [...state.latestCrypto, ...action.payload],
      loaded: action.payload.length === 0,
      progress: false,
      error: null
    }),

    [LATEST_CRYPTO_FAIL]: (state: State, action) => ({
      ...state,
      progress: false,
      error: action.payload.error
    }),

  },
  initialState
);

export default latestCryptoReducer;
