// @flow

import { moduleName } from "ducks/signUp/const";

import type { State } from "ducks/signUp/types";

export const stateSelector = (state: Object): State => state[moduleName];
