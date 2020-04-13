// @flow

import { moduleName } from 'ducks/cryptoInfo/const'

import type { State } from 'ducks/cryptoInfo/types'

export const stateSelector = (state: Object): State => state[moduleName]
