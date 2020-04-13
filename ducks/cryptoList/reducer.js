// @flow
import { combineActions, handleActions } from 'redux-actions'

import { TOGGLE_WATCHLIST_REMOVED } from 'ducks/watchlist/const'
import {
  FETCH_CRYPTO_LIST_FAIL,
  FETCH_CRYPTO_LIST_START,
  FETCH_CRYPTO_LIST_SUCCESS,
  FETCH_WATCHLIST_FAIL,
  FETCH_WATCHLIST_START,
  FETCH_WATCHLIST_SUCCESS,
} from 'ducks/cryptoList/const'

import type { State } from 'ducks/cryptoList/types'

export const initialState: State = {
  data: [],
  start: 1,
  limit: 10,
  loaded: false,
  isWatchlist: false,
  progress: false,
  error: null,
}

const cryptoListReducer = handleActions(
  {
    [combineActions(FETCH_CRYPTO_LIST_START, FETCH_WATCHLIST_START)]: (
      state: State
    ) => ({
      ...state,
      progress: true,
      error: null,
    }),

    [FETCH_CRYPTO_LIST_SUCCESS]: (state: State, action) => ({
      ...state,
      start: state.start + state.limit,
      data: state.isWatchlist
        ? [...action.payload]
        : [...state.data, ...action.payload],
      loaded: action.payload.length < state.limit,
      isWatchlist: false,
      progress: false,
      error: null,
    }),

    [FETCH_WATCHLIST_SUCCESS]: (state: State, action) => ({
      ...state,
      start: 1,
      data: [...action.payload],
      loaded: true,
      isWatchlist: true,
      progress: false,
      error: null,
    }),

    [TOGGLE_WATCHLIST_REMOVED]: (state: State, action) => ({
      ...state,
      data: state.isWatchlist
        ? state.data.filter((crypto) => crypto.id !== action.payload)
        : state.data,
    }),

    [combineActions(FETCH_CRYPTO_LIST_FAIL, FETCH_WATCHLIST_FAIL)]: (
      state: State,
      action
    ) => ({
      ...state,
      progress: false,
      error: action.payload.error,
    }),
  },
  initialState
)

export default cryptoListReducer
