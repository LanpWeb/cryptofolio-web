// @flow

import React from "react";

import privatePage from "hoc/privatePage";

import Layout from "hoc/layout";
import Portfolio from "sections/Portfolio";

const PortfolioPage = () => (
  <Layout>
    <Portfolio />
  </Layout>
);

export default privatePage(PortfolioPage);
