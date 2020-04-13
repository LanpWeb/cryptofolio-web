// @flow
import { handleActions } from 'redux-actions'

import { SIGN_OUT_SUCCESS } from 'ducks/auth/const'
import { MAP_CRYPTO_FAIL, MAP_CRYPTO_START, MAP_CRYPTO_SUCCESS } from './const'

import type { State } from './types'

export const initialState: State = {
  data: [],
  progress: false,
  error: null,
  loaded: false,
}

const mapCryptoReducer = handleActions(
  {
    [MAP_CRYPTO_START]: (state: State) => ({
      ...state,
      progress: true,
      error: null,
    }),

    [MAP_CRYPTO_SUCCESS]: (state: State, action) => ({
      data: action.payload,
      progress: false,
      error: null,
      loaded: true,
    }),

    [MAP_CRYPTO_FAIL]: (state: State, action) => ({
      ...state,
      progress: false,
      error: action.payload.error,
    }),

    [SIGN_OUT_SUCCESS]: () => initialState,
  },
  initialState
)

export default mapCryptoReducer
