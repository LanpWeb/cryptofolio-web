// connect all sagas here

import { all } from "redux-saga/effects";

import { watchLike } from "ducks/like";

export default function* rootSaga() {
  yield all([
    watchLike()
  ]);
}
