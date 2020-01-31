// @flow

import React from "react";
import Head from "next/head";

type Props = {
  children: Object,
  title?: string
};

export default ({ children, title = "React-Next-Koa-Starter" }: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <link rel="shortcut icon" href="/static/favicon.ico" />
    </Head>

    {children}
  </div>
);
