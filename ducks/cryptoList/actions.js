import { createAction } from "redux-actions";

import {
  FETCH_CRYPTO_LIST_REQUEST
} from "./const";

export const getCryptoList = createAction(FETCH_CRYPTO_LIST_REQUEST);
