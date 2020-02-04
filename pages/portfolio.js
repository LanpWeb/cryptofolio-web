// @flow

import React, { Component } from "react";
import type { NextPageContext } from "next";

import withAuth from "utils/withAuth";

import Layout from "hoc/layout";
import Portfolio from "sections/Portfolio";

export default class PortfolioPage extends Component<{}, {}> {
  static async getInitialProps(ctx: NextPageContext) {
    await withAuth(ctx);
    return {};
  }

  render() {
    return (
      <Layout>
        <Portfolio />
      </Layout>
    );
  }
}
