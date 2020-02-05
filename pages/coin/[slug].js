// @flow

import React from "react";
import axios from "axios";

import { apiURL } from "config";

import initAuth from "hoc/initAuth";

import Layout from "hoc/layout";
import Coin from "sections/Coin";

import type { NextPageContext } from "next";
import type { Props } from "pageTypes/coin";

const CoinPage = ({ cryptoInfo }: Props) => (
  <Layout>
    <Coin cryptoInfo={cryptoInfo} />
  </Layout>
);

CoinPage.getInitialProps = async (ctx: NextPageContext) => {
  const { slug } = ctx.query;
  const res = await axios(`${apiURL}/cryptocurrency/info/${slug}`);
  const coin = Object.values(res.data)[0];

  return {
    cryptoInfo: coin
  };
};

export default initAuth(CoinPage);
