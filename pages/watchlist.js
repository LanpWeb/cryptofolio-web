// @flow

import React from "react";

import privatePage from "hoc/privatePage";

import Layout from "hoc/layout";
import Watchlist from "sections/Watchlist";

import fetchCryptoListSaga from "ducks/cryptoList/sagas/fetchCryptoListSaga";
import cryptoGlobalStatsSaga from "ducks/cryptoGlobalStats/sagas/cryptoGlobalStatsSaga";

import type { NextPageContext } from "next";

const WatchlistPage = () => (
  <Layout>
    <Watchlist />
  </Layout>
);

WatchlistPage.getInitialProps = async (ctx: NextPageContext) => {
  const { store, isServer } = ctx;

  const { start, limit, data } = store.getState().cryptoList;
  if (data.length === 0) {
    await store.execSagaTasks(isServer, [{ task: fetchCryptoListSaga, options: { start, limit } }]);
  }

  const { loaded } = store.getState().cryptoGlobalStats;
  if (!loaded) {
    await store.execSagaTasks(isServer, [{ task: cryptoGlobalStatsSaga, options: {} }]);
  }

  return {};
};

export default privatePage(WatchlistPage);
