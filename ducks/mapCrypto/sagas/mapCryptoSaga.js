// @flow

import axios from 'axios'
import { call, put, select } from 'redux-saga/effects'

import { apiURL } from 'config'

import {
  MAP_CRYPTO_FAIL,
  MAP_CRYPTO_START,
  MAP_CRYPTO_SUCCESS,
} from 'ducks/mapCrypto/const'

import { stateSelector } from 'ducks/mapCrypto/selectors'

export default function* mapCryptoSaga(): Generator<any, any, any> {
  const state = yield select(stateSelector)

  if (state.progress) return true

  yield put({ type: MAP_CRYPTO_START })

  try {
    const options = {
      method: 'get',
      url: `${apiURL}/cryptocurrency/map`,
    }

    const res = yield call(axios, options)

    if (res && res.data) {
      yield put({ type: MAP_CRYPTO_SUCCESS, payload: res.data })
    }
  } catch (err) {
    console.log('Error:: ', err)

    yield put({ type: MAP_CRYPTO_FAIL, payload: { error: err.response.data } })
  }
}
