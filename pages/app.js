// @flow

import React, { Component } from "react";

import Layout from "hoc/layout";

export default class AppPage extends Component<{}, {}> {
  static async getInitialProps() {
    return {};
  }

  render() {
    return (
      <Layout>
        <h1>Dashboard</h1>
      </Layout>
    );
  }
}
