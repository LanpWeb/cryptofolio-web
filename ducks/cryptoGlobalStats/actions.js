import { createAction } from "redux-actions";

import { CRYPTO_GLOBAL_STATS_REQUEST } from "ducks/cryptoGlobalStats/const";

export const getCryptoGlobalStats = createAction(CRYPTO_GLOBAL_STATS_REQUEST);
