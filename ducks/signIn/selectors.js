// @flow

import { moduleName } from "ducks/signIn/const";

import type { State } from "ducks/signIn/types";

export const stateSelector = (state: Object): State => state[moduleName];
