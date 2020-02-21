import { combineReducers } from "redux";

import authReducer from "ducks/auth/reducer";
import { moduleName as authModule } from "ducks/auth/const";

import signInReducer from "ducks/signIn/reducer";
import { moduleName as signInModule } from "ducks/signIn/const";

import signUpReducer from "ducks/signUp/reducer";
import { moduleName as signUpModule } from "ducks/signUp/const";

import cryptoListReducer from "ducks/cryptoList/reducer";
import { moduleName as cryptoListModule } from "ducks/cryptoList/const";

import cryptoInfoReducer from "ducks/cryptoInfo/reducer";
import { moduleName as cryptoInfoModule } from "ducks/cryptoInfo/const";

import mapCryptoReducer from "ducks/mapCrypto/reducer";
import { moduleName as mapCryptoModule } from "ducks/mapCrypto/const";

import cryptoGlobalStatsReducer from "ducks/cryptoGlobalStats/reducer";
import { moduleName as cryptoGlobalStatsModule } from "ducks/cryptoGlobalStats/const";

import watchlistReducer from "ducks/watchlist/reducer";
import { moduleName as watchlistModule } from "ducks/watchlist/const";

export default combineReducers({
  [authModule]: authReducer,
  [signInModule]: signInReducer,
  [signUpModule]: signUpReducer,
  [cryptoListModule]: cryptoListReducer,
  [cryptoInfoModule]: cryptoInfoReducer,
  [mapCryptoModule]: mapCryptoReducer,
  [cryptoGlobalStatsModule]: cryptoGlobalStatsReducer,
  [watchlistModule]: watchlistReducer
});
