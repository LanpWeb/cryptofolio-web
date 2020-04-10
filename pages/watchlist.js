// @flow

import React from "react";

import privatePage from "hoc/privatePage";

import Layout from "hoc/layout";
import Watchlist from "sections/Watchlist";

import fetchWatchlistSaga from "ducks/watchlist/sagas/fetchWatchlistSaga";
import cryptoGlobalStatsSaga from "ducks/cryptoGlobalStats/sagas/cryptoGlobalStatsSaga";

import type { NextPageContext } from "next";

const WatchlistPage = () => (
  <Layout>
    <Watchlist />
  </Layout>
);

WatchlistPage.getInitialProps = async (ctx: NextPageContext) => {
  const { store, isServer } = ctx;

  const { loaded: loadedWatchlist } = store.getState().watchlist;
  if (!loadedWatchlist) {
    await store.execSagaTasks(isServer, [{ task: fetchWatchlistSaga, options: {} }]);
  }

  const { loaded: loadedGlobalStats } = store.getState().cryptoGlobalStats;
  if (!loadedGlobalStats) {
    await store.execSagaTasks(isServer, [{ task: cryptoGlobalStatsSaga, options: {} }]);
  }

  return {};
};

export default privatePage(WatchlistPage);
