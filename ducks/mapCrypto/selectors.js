// @flow

import { moduleName } from "ducks/mapCrypto/const";

import type { State } from "ducks/mapCrypto/types";

export const stateSelector = (state: Object): State => state[moduleName];
