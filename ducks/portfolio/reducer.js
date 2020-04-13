// @flow
import { handleActions } from 'redux-actions'

import {
  FETCH_PORTFOLIO_FAIL,
  FETCH_PORTFOLIO_START,
  FETCH_PORTFOLIO_SUCCESS,
} from './const'

import type { State } from './types'

export const initialState: State = {
  data: null,
  progress: false,
  error: null,
}

const portfolioReducer = handleActions(
  {
    [FETCH_PORTFOLIO_START]: (state: State) => ({
      ...state,
      progress: true,
      error: null,
    }),

    [FETCH_PORTFOLIO_SUCCESS]: (state: State, action) => ({
      data: action.payload,
      progress: false,
      error: null,
    }),

    [FETCH_PORTFOLIO_FAIL]: (state: State, action) => ({
      ...state,
      progress: false,
      error: action.payload.error,
    }),
  },
  initialState
)

export default portfolioReducer
