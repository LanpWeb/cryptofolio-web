import { createAction } from "redux-actions";

import {
  FETCH_TRANSACTIONS_REQUEST,
  ADD_TRANSACTION_REQUEST,
  EDIT_TRANSACTION_REQUEST,
  DELETE_TRANSACTION_REQUEST
} from "./const";

export const getTransactions = createAction(FETCH_TRANSACTIONS_REQUEST);
export const addTransaction = createAction(ADD_TRANSACTION_REQUEST);
export const editTransaction = createAction(EDIT_TRANSACTION_REQUEST);
export const deleteTransaction = createAction(DELETE_TRANSACTION_REQUEST);
