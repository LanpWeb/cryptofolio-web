// @flow

import React, { Component } from "react";
import axios from "axios";

import { apiURL } from "config";

import Layout from "hoc/layout";
import Home from "sections/Home";

import type { Props } from "pageTypes/index";

export default class HomePage extends Component<Props, {}> {
  static async getInitialProps() {
    const res = await axios(`${apiURL}/cryptocurrency/latest`);

    return {
      latestCrypto: res.data
    };
  }

  render() {
    const { latestCrypto } = this.props;

    return (
      <Layout>
        <Home latestCrypto={latestCrypto} />
      </Layout>
    );
  }
}
