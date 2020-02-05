// @flow

import React from "react";

import initAuth from "hoc/initAuth";

import Layout from "hoc/layout";
import SignUp from "sections/SignUp";

const SignUpPage = () => (
  <Layout>
    <SignUp />
  </Layout>
);

export default initAuth(SignUpPage);
