// @flow

import axios from 'axios'
import { call, put, select } from 'redux-saga/effects'

import { apiURL } from 'config'

import {
  FETCH_WATCHLIST_FAIL,
  FETCH_WATCHLIST_START,
  FETCH_WATCHLIST_SUCCESS,
} from 'ducks/watchlist/const'

import { accessTokenSelector } from 'ducks/auth/selectors'
import { stateSelector } from 'ducks/watchlist/selectors'

export default function* fetchWatchlistSaga(): Generator<any, any, any> {
  const state = yield select(stateSelector)
  const accessToken = yield select(accessTokenSelector)

  if (state.progress) return true

  yield put({ type: FETCH_WATCHLIST_START })

  try {
    const options = {
      method: 'get',
      url: `${apiURL}/watchlist`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }

    const res = yield call(axios, options)

    if (res && res.data) {
      yield put({ type: FETCH_WATCHLIST_SUCCESS, payload: res.data })
    }
  } catch (err) {
    console.log('Error:: ', err)

    yield put({
      type: FETCH_WATCHLIST_FAIL,
      payload: { error: err.response.data },
    })
  }
}
