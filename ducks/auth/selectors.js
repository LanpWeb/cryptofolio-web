// @flow

import { moduleName } from "ducks/auth/const";

import type { State } from "ducks/auth/types";

export const stateSelector = (state: Object): State => state[moduleName];
