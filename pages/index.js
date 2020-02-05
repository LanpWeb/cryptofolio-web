// @flow

import React from "react";
import axios from "axios";

import { apiURL } from "config";

import initAuth from "hoc/initAuth";

import Layout from "hoc/layout";
import Home from "sections/Home";

import type { Props } from "pageTypes/index";

const HomePage = ({ latestCrypto }: Props) => (
  <Layout>
    <Home latestCrypto={latestCrypto} />
  </Layout>
);

HomePage.getInitialProps = async () => {
  const res = await axios(`${apiURL}/cryptocurrency/latest`);

  return {
    latestCrypto: res.data
  };
};

export default initAuth(HomePage);
