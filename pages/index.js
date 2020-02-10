// @flow

import React from "react";

import publicPrivatePage from "hoc/publicPrivatePage";

import Layout from "hoc/layout";
import Home from "sections/Home";

import fetchCryptoListSaga from "ducks/cryptoList/sagas/fetchCryptoListSaga";

import type { NextPageContext } from "next";

const HomePage = () => (
  <Layout>
    <Home />
  </Layout>
);

HomePage.getInitialProps = async (ctx: NextPageContext) => {
  const { store, isServer } = ctx;

  const { start, limit, data } = store.getState().cryptoList;
  if (data.length === 0) {
    await store.execSagaTasks(isServer, [{ task: fetchCryptoListSaga, options: { start, limit } }]);
  }

  return {};
};

export default publicPrivatePage(HomePage);
