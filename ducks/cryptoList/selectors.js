// @flow

import { moduleName } from 'ducks/cryptoList/const'

import type { State } from 'ducks/cryptoList/types'

export const stateSelector = (state: Object): State => state[moduleName]
