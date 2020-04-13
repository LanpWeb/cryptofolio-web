import { createAction } from 'redux-actions'

import { TOGGLE_WATCHLIST_REQUEST } from 'ducks/watchlist/const'

export const toggleWatchlist = createAction(TOGGLE_WATCHLIST_REQUEST)
