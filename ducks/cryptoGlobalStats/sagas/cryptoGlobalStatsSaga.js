// @flow

import axios from 'axios'
import { call, put, select } from 'redux-saga/effects'

import { apiURL } from 'config'

import {
  CRYPTO_GLOBAL_STATS_FAIL,
  CRYPTO_GLOBAL_STATS_START,
  CRYPTO_GLOBAL_STATS_SUCCESS,
} from 'ducks/cryptoGlobalStats/const'

import { stateSelector } from 'ducks/cryptoGlobalStats/selectors'

export default function* mapCryptoSaga(): Generator<any, any, any> {
  const state = yield select(stateSelector)

  if (state.progress) return true

  yield put({ type: CRYPTO_GLOBAL_STATS_START })

  try {
    const options = {
      method: 'get',
      url: `${apiURL}/cryptocurrency/global-stats`,
    }

    const res = yield call(axios, options)

    if (res && res.data) {
      const globalStatsData = {
        marketCap: res.data.quote.USD.total_market_cap,
        vol24h: res.data.quote.USD.total_volume_24h,
        btcDominance: res.data.btc_dominance,
      }

      yield put({ type: CRYPTO_GLOBAL_STATS_SUCCESS, payload: globalStatsData })
    }
  } catch (err) {
    console.log('Error:: ', err)

    yield put({
      type: CRYPTO_GLOBAL_STATS_FAIL,
      payload: { error: err.response.data },
    })
  }
}
