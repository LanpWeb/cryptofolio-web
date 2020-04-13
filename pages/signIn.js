// @flow

import React from 'react'

import publicPage from 'hoc/publicPage'

import Layout from 'hoc/layout'
import SignIn from 'sections/SignIn'

const SignInPage = () => (
  <Layout>
    <SignIn />
  </Layout>
)

export default publicPage(SignInPage)
