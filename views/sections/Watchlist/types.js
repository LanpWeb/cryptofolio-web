// @flow

import type { Crypto, State as WatchlistState } from 'ducks/watchlist/types'
import type { State as CryptoGlobalStatsState } from 'ducks/cryptoGlobalStats/types'

export type Props = {
  watchlist: WatchlistState,
  cryptoGlobalStats: CryptoGlobalStatsState,
  toggleWatchlist: (crypto: Crypto, action: 'ADD' | 'REMOVE') => void,
}
