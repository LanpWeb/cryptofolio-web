import { createAction } from 'redux-actions'

import { FETCH_CRYPTO_INFO_REQUEST } from './const'

export const getCryptoInfo = createAction(FETCH_CRYPTO_INFO_REQUEST)
