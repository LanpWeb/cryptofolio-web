// @flow

import React from "react";

import publicPrivatePage from "hoc/publicPrivatePage";

import Layout from "hoc/layout";
import Coin from "sections/Coin";

import fetchCryptoInfoSaga from "ducks/cryptoInfo/sagas/fetchCryptoInfoSaga";

import type { NextPageContext } from "next";

const CoinPage = () => (
  <Layout>
    <Coin />
  </Layout>
);

CoinPage.getInitialProps = async (ctx: NextPageContext) => {
  const { store, isServer, query } = ctx;
  const { slug } = query;

  await store.execSagaTasks(isServer, [{ task: fetchCryptoInfoSaga, options: { slug } }]);

  return {};
};

export default publicPrivatePage(CoinPage);
