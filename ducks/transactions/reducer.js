// @flow
import { handleActions, combineActions } from "redux-actions";

import {
  FETCH_TRANSACTIONS_START,
  FETCH_TRANSACTIONS_SUCCESS,
  FETCH_TRANSACTIONS_FAIL,

  ADD_TRANSACTION_START,
  ADD_TRANSACTION_SUCCESS,
  ADD_TRANSACTION_FAIL,

  EDIT_TRANSACTION_START,
  EDIT_TRANSACTION_SUCCESS,
  EDIT_TRANSACTION_FAIL,

  DELETE_TRANSACTION_START,
  DELETE_TRANSACTION_SUCCESS,
  DELETE_TRANSACTION_FAIL
} from "./const";

import type { State } from "./types";

export const initialState: State = {
  data: [],
  start: 0,
  limit: 9,
  loaded: false,
  progress: false,
  error: null
};

const transactionsReducer = handleActions(
  {
    [combineActions(
      FETCH_TRANSACTIONS_START,
      ADD_TRANSACTION_START,
      EDIT_TRANSACTION_START,
      DELETE_TRANSACTION_START
    )]: (state: State) => ({
      ...state,
      progress: true,
      error: null
    }),

    [FETCH_TRANSACTIONS_SUCCESS]: (state: State, action) => ({
      ...state,
      start: state.start + state.limit,
      data: [...state.data, ...action.payload],
      loaded: action.payload.length < state.limit,
      progress: false,
      error: null
    }),

    [combineActions(
      ADD_TRANSACTION_SUCCESS,
      EDIT_TRANSACTION_SUCCESS,
      DELETE_TRANSACTION_SUCCESS
    )]: (state: State) => ({
      ...state,
      progress: false,
      error: null
    }),

    [combineActions(
      FETCH_TRANSACTIONS_FAIL,
      ADD_TRANSACTION_FAIL,
      EDIT_TRANSACTION_FAIL,
      DELETE_TRANSACTION_FAIL
    )]: (state: State, action) => ({
      ...state,
      progress: false,
      error: action.payload.error
    }),

  },
  initialState
);

export default transactionsReducer;
