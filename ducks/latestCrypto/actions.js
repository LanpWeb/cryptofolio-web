import { createAction } from "redux-actions";

import {
  LATEST_CRYPTO_REQUEST
} from "./const";

export const getLatestCrypto = createAction(LATEST_CRYPTO_REQUEST);
