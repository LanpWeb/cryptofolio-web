// @flow

import axios from 'axios'
import { call, put, select } from 'redux-saga/effects'

import { apiURL } from 'config'

import {
  TOGGLE_WATCHLIST_ADDED,
  TOGGLE_WATCHLIST_FAIL,
  TOGGLE_WATCHLIST_REMOVED,
  TOGGLE_WATCHLIST_START,
} from 'ducks/watchlist/const'

import { accessTokenSelector } from 'ducks/auth/selectors'
import { stateSelector } from 'ducks/watchlist/selectors'

import type { ToggleWatchlistPayload } from 'ducks/watchlist/types'

export default function* toggleWatchlistSaga({
  payload: { crypto, action },
}: ToggleWatchlistPayload): Generator<any, any, any> {
  const state = yield select(stateSelector)
  const accessToken = yield select(accessTokenSelector)

  if (state.progress) return true

  yield put({ type: TOGGLE_WATCHLIST_START, payload: crypto })

  try {
    const options = {
      method: 'post',
      url: `${apiURL}/watchlist`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: {
        coinId: crypto.id,
      },
    }

    const res = yield call(axios, options)
    if (res && res.data) {
      if (action === 'ADD') {
        yield put({ type: TOGGLE_WATCHLIST_ADDED, payload: crypto })
      }
      if (action === 'REMOVE') {
        yield put({ type: TOGGLE_WATCHLIST_REMOVED, payload: crypto })
      }
    }
  } catch (err) {
    console.log('Error:: ', err)

    yield put({ type: TOGGLE_WATCHLIST_FAIL, payload: { error: err.message } })
  }
}
