// @flow

import { moduleName } from 'ducks/transactions/const'

import type { State } from 'ducks/transactions/types'

export const stateSelector = (state: Object): State => state[moduleName]
