// @flow
import { combineActions, handleActions } from 'redux-actions'

import { SIGN_OUT_SUCCESS } from 'ducks/auth/const'
import {
  FETCH_WATCHLIST_FAIL,
  FETCH_WATCHLIST_START,
  FETCH_WATCHLIST_SUCCESS,
  INITIAL_WATCHLIST_IDS,
  TOGGLE_WATCHLIST_ADDED,
  TOGGLE_WATCHLIST_FAIL,
  TOGGLE_WATCHLIST_REMOVED,
  TOGGLE_WATCHLIST_START,
} from 'ducks/watchlist/const'

import type { State } from 'ducks/watchlist/types'

export const initialState: State = {
  data: [],
  recommended: [],
  ids: [],
  toggledId: 0,
  loaded: false,
  progress: false,
  error: null,
}

const watchlistReducer = handleActions(
  {
    [FETCH_WATCHLIST_START]: (state: State) => ({
      ...state,
      toggledId: 0,
      progress: true,
      error: null,
    }),

    [TOGGLE_WATCHLIST_START]: (state: State, action) => ({
      ...state,
      toggledId: action.payload.id,
      progress: true,
      error: null,
    }),

    [INITIAL_WATCHLIST_IDS]: (state: State, action) => ({
      ...state,
      ids: action.payload,
      toggledId: 0,
      progress: false,
      error: null,
    }),

    [FETCH_WATCHLIST_SUCCESS]: (state: State, action) => ({
      ...state,
      data: [...action.payload.data],
      recommended: [...action.payload.recommended],
      toggledId: 0,
      loaded: true,
      progress: false,
      error: null,
    }),

    [TOGGLE_WATCHLIST_ADDED]: (state: State, action) => ({
      ...state,
      data: [...state.data, action.payload],
      ids: [...state.ids, action.payload.id],
      toggledId: 0,
      progress: false,
      error: null,
    }),

    [TOGGLE_WATCHLIST_REMOVED]: (state: State, action) => ({
      ...state,
      data: state.data.filter((crypto) => crypto.id !== action.payload.id),
      ids: state.ids.filter((id) => id !== action.payload.id),
      toggledId: 0,
      progress: false,
      error: null,
    }),

    [combineActions(FETCH_WATCHLIST_FAIL, TOGGLE_WATCHLIST_FAIL)]: (
      state: State,
      action
    ) => ({
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
