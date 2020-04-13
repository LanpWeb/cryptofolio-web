// @flow
import { handleActions } from 'redux-actions'

import { SIGN_OUT_SUCCESS } from 'ducks/auth/const'
import {
  ADD_WATCHLIST,
  TOGGLE_WATCHLIST_ADDED,
  TOGGLE_WATCHLIST_FAIL,
  TOGGLE_WATCHLIST_REMOVED,
  TOGGLE_WATCHLIST_START,
} from 'ducks/watchlist/const'

import type { State } from 'ducks/watchlist/types'

export const initialState: State = {
  data: [],
  toggledId: 0,
  progress: false,
  error: null,
}

const watchlistReducer = handleActions(
  {
    [TOGGLE_WATCHLIST_START]: (state: State, action) => ({
      ...state,
      toggledId: action.payload,
      progress: true,
      error: null,
    }),

    [ADD_WATCHLIST]: (state: State, action) => ({
      data: action.payload,
      toggledId: 0,
      progress: false,
      error: null,
    }),

    [TOGGLE_WATCHLIST_ADDED]: (state: State, action) => ({
      data: [...state.data, action.payload],
      toggledId: 0,
      progress: false,
      error: null,
    }),

    [TOGGLE_WATCHLIST_REMOVED]: (state: State, action) => ({
      data: state.data.filter((id) => id !== action.payload),
      toggledId: 0,
      progress: false,
      error: null,
    }),

    [TOGGLE_WATCHLIST_FAIL]: (state: State, action) => ({
      ...state,
      toggledId: 0,
      progress: false,
      error: action.payload.error,
    }),

    [SIGN_OUT_SUCCESS]: () => initialState,
  },
  initialState
)

export default watchlistReducer
