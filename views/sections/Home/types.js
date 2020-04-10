// @flow

import type { Crypto, State as CryptoListState } from "ducks/cryptoList/types";
import type { State as CryptoGlobalStatsState } from "ducks/cryptoGlobalStats/types";
import type { State as WatchlistState } from "ducks/watchlist/types";

export type Props = {
  auth: boolean,
  watchlist: WatchlistState,
  cryptoList: CryptoListState,
  cryptoGlobalStats: CryptoGlobalStatsState,
  getCryptoList: (start: number, limit: number) => void,
  toggleWatchlist: (crypto: Crypto, action: "ADD" | "REMOVE") => void,
};
