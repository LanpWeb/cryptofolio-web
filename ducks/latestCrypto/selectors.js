// @flow

import { moduleName } from "ducks/latestCrypto/const";

import type { State } from "ducks/latestCrypto/types";

export const stateSelector = (state: Object): State => state[moduleName];
