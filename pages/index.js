// @flow

import React from "react";

import initAuth from "hoc/initAuth";

import Layout from "hoc/layout";
import Home from "sections/Home";

import latestCryptoSaga from "ducks/latestCrypto/sagas/latestCryptoSaga";

import type { NextPageContext } from "next";

const HomePage = () => (
  <Layout>
    <Home />
  </Layout>
);

HomePage.getInitialProps = async (ctx: NextPageContext) => {
  const { store, isServer } = ctx;

  const { start, limit, latestCrypto } = store.getState().latestCrypto;
  if (latestCrypto.length === 0) {
    await store.execSagaTasks(isServer, [{ task: latestCryptoSaga, options: { start, limit } }]);
  }

  return {};
};

export default initAuth(HomePage);
