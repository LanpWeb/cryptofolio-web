import { createAction } from "redux-actions";

import {
  SIGN_UP_REQUEST
} from "./const";

export const signUp = createAction(SIGN_UP_REQUEST);
