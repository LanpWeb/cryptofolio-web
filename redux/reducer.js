import { combineReducers } from "redux";

import authReducer from "ducks/auth/reducer";
import { moduleName as authModule } from "ducks/auth/const";

import signInReducer from "ducks/signIn/reducer";
import { moduleName as signInModule } from "ducks/signIn/const";

import signUpReducer from "ducks/signUp/reducer";
import { moduleName as signUpModule } from "ducks/signUp/const";

import latestCryptoReducer from "ducks/latestCrypto/reducer";
import { moduleName as latestCryptoModule } from "ducks/latestCrypto/const";

import mapCryptoReducer from "ducks/mapCrypto/reducer";
import { moduleName as mapCryptoModule } from "ducks/mapCrypto/const";

export default combineReducers({
  [authModule]: authReducer,
  [signInModule]: signInReducer,
  [signUpModule]: signUpReducer,
  [latestCryptoModule]: latestCryptoReducer,
  [mapCryptoModule]: mapCryptoReducer
});
