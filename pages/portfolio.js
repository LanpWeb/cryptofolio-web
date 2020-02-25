// @flow

import React from "react";

import privatePage from "hoc/privatePage";

import Layout from "hoc/layout";
import Portfolio from "sections/Portfolio";

import fetchPortfolioSaga from "ducks/portfolio/sagas/fetchPortfolioSaga";
import fetchTransactionsSaga from "ducks/transactions/sagas/fetchTransactionsSaga";

import type { NextPageContext } from "next";

const PortfolioPage = () => (
  <Layout>
    <Portfolio />
  </Layout>
);

PortfolioPage.getInitialProps = async (ctx: NextPageContext) => {
  const { store, isServer } = ctx;

  await store.execSagaTasks(isServer, [{ task: fetchPortfolioSaga, options: {} }]);

  const { start, limit, data } = store.getState().transactions;
  if (data.length === 0) {
    await store.execSagaTasks(isServer, [{ task: fetchTransactionsSaga, options: { start, limit } }]);
  }

  return {};
};

export default privatePage(PortfolioPage);
