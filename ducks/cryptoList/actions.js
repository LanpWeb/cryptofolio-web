import { createAction } from "redux-actions";

import {
  FETCH_CRYPTO_LIST_REQUEST,
  FETCH_WATCHLIST_REQUEST
} from "ducks/cryptoList/const";

export const getCryptoList = createAction(FETCH_CRYPTO_LIST_REQUEST);
export const getWatchlist = createAction(FETCH_WATCHLIST_REQUEST);
