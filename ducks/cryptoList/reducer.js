// @flow
import { handleActions } from 'redux-actions'

import {
  FETCH_CRYPTO_LIST_FAIL,
  FETCH_CRYPTO_LIST_START,
  FETCH_CRYPTO_LIST_SUCCESS,
} from 'ducks/cryptoList/const'

import type { State } from 'ducks/cryptoList/types'

export const initialState: State = {
  data: [],
  start: 1,
  limit: 10,
  loaded: false,
  progress: false,
  error: null,
}

const cryptoListReducer = handleActions(
  {
    [FETCH_CRYPTO_LIST_START]: (state: State) => ({
      ...state,
      progress: true,
      error: null,
    }),

    [FETCH_CRYPTO_LIST_SUCCESS]: (state: State, action) => ({
      ...state,
      start: state.start + state.limit,
      data: [...state.data, ...action.payload],
      loaded: action.payload.length < state.limit,
      progress: false,
      error: null,
    }),

    [FETCH_CRYPTO_LIST_FAIL]: (state: State, action) => ({
      ...state,
      progress: false,
      error: action.payload.error,
    }),
  },
  initialState
)

export default cryptoListReducer
