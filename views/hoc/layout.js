// @flow

import React from 'react'
import Head from 'next/head'
import type { Node } from 'react'

type Props = {
  children?: Node,
  title?: string,
}

const Layout = ({ children, title = 'React-Next-Koa-Starter' }: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <link rel="shortcut icon" href="/static/favicon.ico" />
    </Head>

    {children}
  </div>
)

export default Layout
