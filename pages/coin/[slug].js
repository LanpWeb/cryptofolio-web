// @flow

import React, { Component } from "react";
import { withRouter } from "next/router";
import axios from "axios";

import { apiURL } from "config";

import Layout from "hoc/layout";
import Coin from "sections/Coin";

import type { Props } from "pageTypes/coin";

class CoinPage extends Component<Props, {}> {
  static async getInitialProps({ query }) {
    const { slug } = query;
    const res = await axios(`${apiURL}/cryptocurrency/info/${slug}`);
    const coin = Object.values(res.data)[0];

    return {
      cryptoInfo: coin
    };
  }

  render() {
    const { cryptoInfo } = this.props;

    return (
      <Layout>
        <Coin cryptoInfo={cryptoInfo} />
      </Layout>
    );
  }
}

export default withRouter(CoinPage);
