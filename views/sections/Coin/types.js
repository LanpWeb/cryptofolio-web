// @flow

import type { Crypto, State as CryptoInfoState } from "ducks/cryptoInfo/types";
import type { State as WatchlistState } from "ducks/watchlist/types";

export type Props = {
  cryptoInfo: CryptoInfoState,
  auth: boolean,
  watchlist: WatchlistState,
  toggleWatchlist: (crypto: Crypto, action: "ADD" | "REMOVE") => void,
};
