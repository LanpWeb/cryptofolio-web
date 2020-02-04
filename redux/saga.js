import { all } from "redux-saga/effects";

import { watchAuth } from "ducks/auth/sagas";
import { watchSignIn } from "ducks/signIn/sagas";
import { watchSignUp } from "ducks/signUp/sagas";

export default function* rootSaga() {
  yield all([
    watchAuth(),
    watchSignIn(),
    watchSignUp()
  ]);
}
