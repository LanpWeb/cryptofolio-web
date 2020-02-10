// @flow

import React from "react";

import type { NextPageContext, NextPage } from "next";
import nookies from "nookies";

import tokenRefreshSaga from "ducks/auth/sagas/tokenRefreshSaga";

const publicPrivatePage = (WrappedComponent: NextPage) => {
  const Initialized = (props: any) => (
    <WrappedComponent {...props} />
  );

  Initialized.getInitialProps = async (ctx: NextPageContext) => {
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

    const componentProps = WrappedComponent.getInitialProps && (await WrappedComponent.getInitialProps(ctx));
    return { ...componentProps };
  };

  return Initialized;
};

export default publicPrivatePage;
