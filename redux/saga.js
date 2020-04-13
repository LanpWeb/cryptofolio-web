import { all } from 'redux-saga/effects'

import { watchAuth } from 'ducks/auth/sagas'
import { watchSignIn } from 'ducks/signIn/sagas'
import { watchSignUp } from 'ducks/signUp/sagas'
import { watchCryptoList } from 'ducks/cryptoList/sagas'
import { watchCryptoInfo } from 'ducks/cryptoInfo/sagas'
import { watchMapCrypto } from 'ducks/mapCrypto/sagas'
import { watchCryptoGlobalStats } from 'ducks/cryptoGlobalStats/sagas'
import { watchToggleWatchlist } from 'ducks/watchlist/sagas'
import { watchPortfolio } from 'ducks/portfolio/sagas'
import { watchTransactions } from 'ducks/transactions/sagas'

export default function* rootSaga() {
  yield all([
    watchAuth(),
    watchSignIn(),
    watchSignUp(),
    watchCryptoList(),
    watchCryptoInfo(),
    watchMapCrypto(),
    watchCryptoGlobalStats(),
    watchToggleWatchlist(),
    watchPortfolio(),
    watchTransactions(),
  ])
}
