// @flow

import axios from 'axios'
import { call, put, select } from 'redux-saga/effects'

import { apiURL } from 'config'

import {
  FETCH_PORTFOLIO_FAIL,
  FETCH_PORTFOLIO_START,
  FETCH_PORTFOLIO_SUCCESS,
} from 'ducks/portfolio/const'

import { accessTokenSelector } from 'ducks/auth/selectors'
import { stateSelector } from 'ducks/portfolio/selectors'

export default function* fetchPortfolioSaga(): Generator<any, any, any> {
  const state = yield select(stateSelector)
  const accessToken = yield select(accessTokenSelector)

  if (state.progress) return true

  yield put({ type: FETCH_PORTFOLIO_START })

  try {
    const options = {
      method: 'get',
      url: `${apiURL}/portfolio`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }

    const res = yield call(axios, options)

    if (res && res.data) {
      yield put({ type: FETCH_PORTFOLIO_SUCCESS, payload: res.data })
    }
  } catch (err) {
    console.log('Error:: ', err)

    yield put({
      type: FETCH_PORTFOLIO_FAIL,
      payload: { error: err.response.data },
    })
  }
}
