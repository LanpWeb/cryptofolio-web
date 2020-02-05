// @flow

import React from "react";

import initAuth from "hoc/initAuth";

import Layout from "hoc/layout";
import SignIn from "sections/SignIn";

const SignInPage = () => (
  <Layout>
    <SignIn />
  </Layout>
);

export default initAuth(SignInPage);
