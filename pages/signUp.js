// @flow

import React from 'react'

import publicPage from 'hoc/publicPage'

import Layout from 'hoc/layout'
import SignUp from 'sections/SignUp'

const SignUpPage = () => (
  <Layout>
    <SignUp />
  </Layout>
)

export default publicPage(SignUpPage)
