// @flow

import { moduleName } from 'ducks/watchlist/const'

import type { State } from 'ducks/watchlist/types'

export const stateSelector = (state: Object): State => state[moduleName]
