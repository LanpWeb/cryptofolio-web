// @flow

import React from "react";

import privatePage from "hoc/privatePage";

import Layout from "hoc/layout";
import Settings from "sections/Settings";

const SettingsPage = () => (
  <Layout>
    <Settings />
  </Layout>
);

export default privatePage(SettingsPage);
