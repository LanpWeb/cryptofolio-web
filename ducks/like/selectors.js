// @flow

import { moduleName } from "ducks/like/const";

import type { State } from "ducks/like/types";

export const stateSelector = (state: Object): State => state[moduleName];
