// @flow
import axios from 'axios'
import { call, put, select } from 'redux-saga/effects'

import { apiURL } from 'config'
import nookies from 'nookies'

import {
  TOKEN_REFRESH_FAIL,
  TOKEN_REFRESH_START,
  TOKEN_REFRESH_SUCCESS,
} from 'ducks/auth/const'

import type { RefreshTokenPayload } from 'ducks/auth/types'
import { stateSelector } from 'ducks/auth/selectors'
import fetchJWTDataSaga from 'ducks/auth/sagas/fetchJWTDataSaga'

export default function* tokenRefreshSaga({
  payload: { isServer = false, refreshToken, ctx },
}: RefreshTokenPayload): Generator<any, any, any> {
  const state = yield select(stateSelector)

  if (state.progress) return true

  yield put({ type: TOKEN_REFRESH_START })

  try {
    const options = {
      method: 'post',
      url: `${apiURL}/refresh-token`,
      headers: refreshToken ? { cookie: `refreshToken=${refreshToken}` } : {},
    }

    const res = yield call(axios, options)

    if (ctx && res && res.headers['set-cookie']) {
      ctx.res.setHeader('Set-Cookie', [res.headers['set-cookie']])
    }

    if (res && res.data) {
      const { accessToken } = res.data

      yield put({ type: TOKEN_REFRESH_SUCCESS, payload: { accessToken } })
      yield call(fetchJWTDataSaga, { payload: { accessToken, isServer } })
    }
  } catch (err) {
    console.log('Error:: ', err)

    yield put({ type: TOKEN_REFRESH_FAIL, payload: { error: err.message } })
    // If request is on Server-side we'll destoroy a refreshToken cookie
    if (isServer && ctx) {
      nookies.destroy(ctx, 'refreshToken')
    }
  }
}
