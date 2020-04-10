// @flow

import React from "react";

import privatePage from "hoc/privatePage";

import Layout from "hoc/layout";
import Watchlist from "sections/Watchlist";

import fetchWatchlistSaga from "ducks/watchlist/sagas/fetchWatchlistSaga";

import type { NextPageContext } from "next";

const WatchlistPage = () => (
  <Layout>
    <Watchlist />
  </Layout>
);

WatchlistPage.getInitialProps = async (ctx: NextPageContext) => {
  const { store, isServer } = ctx;

  const { loaded } = store.getState().watchlist;
  if (!loaded) {
    await store.execSagaTasks(isServer, [{ task: fetchWatchlistSaga, options: {} }]);
  }

  return {};
};

export default privatePage(WatchlistPage);
