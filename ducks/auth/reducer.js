// @flow
import { combineActions, handleActions } from 'redux-actions'
import type { State } from './types'

import {
  FETCH_JWT_DATA_FAIL,
  FETCH_JWT_DATA_START,
  FETCH_JWT_DATA_SUCCESS,
  FETCH_USER_INFO_FAIL,
  FETCH_USER_INFO_START,
  FETCH_USER_INFO_SUCCESS,
  SET_SILENT_REFRESH,
  SIGN_OUT_SUCCESS,
  SILENT_REFRESH_TO_SET,
  TOKEN_REFRESH_FAIL,
  TOKEN_REFRESH_START,
  TOKEN_REFRESH_SUCCESS,
} from './const'

export const initialState: State = {
  silentRefreshToSet: false,
  jwt: {
    auth: false,
    accessToken: null,
    exp: null,
  },
  id: null,
  email: null,
  watchlist: [],
  progress: false,
  error: null,
}

const authReducer = handleActions(
  {
    [combineActions(
      FETCH_USER_INFO_START,
      TOKEN_REFRESH_START,
      FETCH_JWT_DATA_START
    )]: (state: State) => ({
      ...state,
      progress: true,
      error: null,
    }),

    [SILENT_REFRESH_TO_SET]: (state: State) => ({
      ...state,
      silentRefreshToSet: true,
    }),
    [SET_SILENT_REFRESH]: (state: State) => ({
      ...state,
      silentRefreshToSet: false,
    }),

    [FETCH_USER_INFO_SUCCESS]: (state: State, action) => ({
      ...state,
      ...action.payload,
      progress: false,
      error: null,
    }),

    [TOKEN_REFRESH_SUCCESS]: (state: State, action) => ({
      ...state,
      jwt: {
        ...state.jwt,
        accessToken: action.payload.accessToken,
      },
      progress: false,
      error: null,
    }),

    [FETCH_JWT_DATA_SUCCESS]: (state: State, action) => ({
      ...state,
      jwt: {
        ...state.jwt,
        ...action.payload,
        auth: true,
      },
      progress: false,
      error: null,
    }),

    [combineActions(FETCH_JWT_DATA_FAIL, FETCH_USER_INFO_FAIL)]: (
      state: State,
      action
    ) => ({
      ...state,
      progress: false,
      error: action.payload.error,
    }),

    [TOKEN_REFRESH_FAIL]: (state: State, action) => ({
      ...initialState,
      error: action.payload.error,
    }),

    [SIGN_OUT_SUCCESS]: () => initialState,
  },
  initialState
)

export default authReducer
