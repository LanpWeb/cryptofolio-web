// @flow

import axios from 'axios'
import { call, put, select } from 'redux-saga/effects'

import { apiURL } from 'config'

import {
  FETCH_CRYPTO_INFO_FAIL,
  FETCH_CRYPTO_INFO_START,
  FETCH_CRYPTO_INFO_SUCCESS,
} from 'ducks/cryptoInfo/const'

import { stateSelector } from 'ducks/cryptoInfo/selectors'
import type { CryptoInfoPayload } from 'ducks/cryptoInfo/types'

export default function* fetchCryptoInfoSaga({
  payload: { slug },
}: CryptoInfoPayload): Generator<any, any, any> {
  const state = yield select(stateSelector)

  if (state.progress) return true

  yield put({ type: FETCH_CRYPTO_INFO_START })

  try {
    const options = {
      method: 'get',
      url: `${apiURL}/cryptocurrency/info/${slug}`,
    }

    const res = yield call(axios, options)

    if (res && res.data) {
      yield put({ type: FETCH_CRYPTO_INFO_SUCCESS, payload: res.data })
    }
  } catch (err) {
    console.log('Error:: ', err)

    yield put({
      type: FETCH_CRYPTO_INFO_FAIL,
      payload: { error: err.response.data },
    })
  }
}
