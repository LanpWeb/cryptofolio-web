import { all } from "redux-saga/effects";

import { watchAuth } from "ducks/auth/sagas";
import { watchSignIn } from "ducks/signIn/sagas";
import { watchSignUp } from "ducks/signUp/sagas";
import { watchLatestCrypto } from "ducks/latestCrypto/sagas";
import { watchMapCrypto } from "ducks/mapCrypto/sagas";

export default function* rootSaga() {
  yield all([
    watchAuth(),
    watchSignIn(),
    watchSignUp(),
    watchLatestCrypto(),
    watchMapCrypto()
  ]);
}
