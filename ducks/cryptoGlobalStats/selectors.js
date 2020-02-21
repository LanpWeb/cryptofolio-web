// @flow

import { moduleName } from "ducks/cryptoGlobalStats/const";

import type { State } from "ducks/cryptoGlobalStats/types";

export const stateSelector = (state: Object): State => state[moduleName];
