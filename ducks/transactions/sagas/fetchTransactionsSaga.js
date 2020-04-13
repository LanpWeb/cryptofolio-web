// @flow

import axios from 'axios'
import { call, put, select } from 'redux-saga/effects'

import { apiURL } from 'config'

import {
  FETCH_TRANSACTIONS_FAIL,
  FETCH_TRANSACTIONS_START,
  FETCH_TRANSACTIONS_SUCCESS,
} from 'ducks/transactions/const'

import { accessTokenSelector } from 'ducks/auth/selectors'
import { stateSelector } from 'ducks/transactions/selectors'
import type { TransactionsPayload } from 'ducks/transactions/types'

export default function* fetchTransactionsSaga({
  payload: { start, limit },
}: TransactionsPayload): Generator<any, any, any> {
  const state = yield select(stateSelector)
  const accessToken = yield select(accessTokenSelector)

  if (state.progress) return true

  yield put({ type: FETCH_TRANSACTIONS_START })

  try {
    const options = {
      method: 'get',
      url: `${apiURL}/transactions`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        start,
        limit,
      },
    }

    const res = yield call(axios, options)
    if (res && res.data) {
      yield put({ type: FETCH_TRANSACTIONS_SUCCESS, payload: res.data })
    }
  } catch (err) {
    console.log('Error:: ', err)

    yield put({
      type: FETCH_TRANSACTIONS_FAIL,
      payload: { error: err.response.data },
    })
  }
}
