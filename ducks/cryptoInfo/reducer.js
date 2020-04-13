// @flow
import { handleActions } from 'redux-actions'

import {
  FETCH_CRYPTO_INFO_FAIL,
  FETCH_CRYPTO_INFO_START,
  FETCH_CRYPTO_INFO_SUCCESS,
} from './const'

import type { State } from './types'

export const initialState: State = {
  data: null,
  progress: false,
  error: null,
}

const cryptoInfoReducer = handleActions(
  {
    [FETCH_CRYPTO_INFO_START]: (state: State) => ({
      ...state,
      progress: true,
      error: null,
    }),

    [FETCH_CRYPTO_INFO_SUCCESS]: (state: State, action) => ({
      data: action.payload,
      progress: false,
      error: null,
    }),

    [FETCH_CRYPTO_INFO_FAIL]: (state: State, action) => ({
      ...state,
      progress: false,
      error: action.payload.error,
    }),
  },
  initialState
)

export default cryptoInfoReducer
