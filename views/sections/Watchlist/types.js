// @flow

import type { Crypto, State as WatchlistState } from "ducks/watchlist/types";

export type Props = {
    watchlist: WatchlistState,
    toggleWatchlist: (crypto: Crypto, action: "ADD" | "REMOVE") => void,
};
