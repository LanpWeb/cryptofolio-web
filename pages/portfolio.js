// @flow

import React from "react";

import withAuth from "hoc/withAuth";

import Layout from "hoc/layout";
import Portfolio from "sections/Portfolio";

const PortfolioPage = () => (
  <Layout>
    <Portfolio />
  </Layout>
);

export default withAuth(PortfolioPage);
