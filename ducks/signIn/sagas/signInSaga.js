// @flow

import axios from 'axios'
import redirect from 'server/redirect'
import { call, put, select } from 'redux-saga/effects'

import { apiURL } from 'config'

import {
  SIGN_IN_FAIL,
  SIGN_IN_START,
  SIGN_IN_SUCCESS,
} from 'ducks/signIn/const'

import { stateSelector } from 'ducks/signIn/selectors'
import type { SignInPayload } from 'ducks/signIn/types'

import fetchJWTDataSaga from 'ducks/auth/sagas/fetchJWTDataSaga'

export default function* signInSaga({
  payload: { email, password },
}: SignInPayload): Generator<any, any, any> {
  const state = yield select(stateSelector)

  if (state.progress) return true

  yield put({ type: SIGN_IN_START })

  try {
    const options = {
      method: 'post',
      url: `${apiURL}/sign-in`,
      data: {
        email,
        password,
      },
    }

    const res = yield call(axios, options)

    if (res && res.data) {
      yield put({ type: SIGN_IN_SUCCESS })
      yield call(fetchJWTDataSaga, {
        payload: { accessToken: res.data.accessToken },
      })

      // to support sign in in all windows
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('signin', Date.now())

        redirect('/app')
      }
    }
  } catch (err) {
    console.log('Error:: ', err)

    yield put({ type: SIGN_IN_FAIL, payload: { error: err.response.data } })
  }
}
