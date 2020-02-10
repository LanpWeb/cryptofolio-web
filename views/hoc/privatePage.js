// @flow

import React from "react";

import type { NextPageContext, NextPage } from "next";
import nookies from "nookies";

import redirect from "server/redirect";

import tokenRefreshSaga from "ducks/auth/sagas/tokenRefreshSaga";

const privatePage = (WrappedComponent: NextPage) => {
  const Authenticated = (props: any) => (
    <WrappedComponent {...props} />
  );

  Authenticated.getInitialProps = async (ctx: NextPageContext) => {
    const { store, isServer } = ctx;

    if (isServer) {
      const { refreshToken } = nookies.get(ctx);

      if (refreshToken) {
        await store.execSagaTasks(isServer, [
          {
            task: tokenRefreshSaga,
            options: { refreshToken, isServer, ctx }
          }
        ]);
      }
    } else {
      const storeState = store.getState();

      if (storeState.auth.jwt.accessToken === null) {
        await store.execSagaTasks(isServer, [{ task: tokenRefreshSaga }]);
      }
    }

    const { jwt } = store.getState().auth;

    if (jwt.accessToken === null) {
      redirect("/", ctx);
    }

    const componentProps = WrappedComponent.getInitialProps && (await WrappedComponent.getInitialProps(ctx));
    return { ...componentProps };
  };

  return Authenticated;
};

export default privatePage;
