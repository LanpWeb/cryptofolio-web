import nookies from "nookies";

import redirect from "server/redirect";

import tokenRefreshSaga from "ducks/auth/sagas/tokenRefreshSaga";

const withAuth = async ctx => {
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
    redirect("/sign-in", ctx);
  }
};

export default withAuth;
