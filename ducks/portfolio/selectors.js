// @flow

import { moduleName } from 'ducks/portfolio/const'

import type { State } from 'ducks/portfolio/types'

export const stateSelector = (state: Object): State => state[moduleName]
