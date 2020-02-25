// @flow

import { takeEvery } from "redux-saga/effects";

import fetchPortfolioSaga from "ducks/portfolio/sagas/fetchPortfolioSaga";

import { FETCH_PORTFOLIO_REQUEST } from "ducks/portfolio/const";

export function* watchPortfolio(): mixed {
  yield takeEvery(FETCH_PORTFOLIO_REQUEST, fetchPortfolioSaga);
}
