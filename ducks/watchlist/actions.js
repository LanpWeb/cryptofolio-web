import { createAction } from "redux-actions";

import {
  FETCH_WATCHLIST_REQUEST,
  TOGGLE_WATCHLIST_REQUEST,
} from "ducks/watchlist/const";

export const getWatchlist = createAction(FETCH_WATCHLIST_REQUEST);
export const toggleWatchlist = createAction(TOGGLE_WATCHLIST_REQUEST);
