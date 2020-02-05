import React from "react";
import App from "next/app";
import getConfig from "next/config";
import withRedux from "next-redux-wrapper";
import { withRouter } from "next/router";
import { Provider, connect } from "react-redux";

import { initStore } from "store";
import { setSilentRefresh, signOutSuccess, tokenRefresh } from "ducks/auth/actions";
import redirect from "server/redirect";

import "../styles/main.scss";

const { publicRuntimeConfig } = getConfig();

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    return {
      pageProps: {
        // Call page-level getInitialProps
        ...(Component.getInitialProps
          ? await Component.getInitialProps(ctx)
          : {})
      }
    };
  }

  componentDidMount() {
    if (
      (publicRuntimeConfig.env === "server-dev")
      || (publicRuntimeConfig.env === "server-prod")
    ) {
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker
          .register("/service-worker.js")
          .then(() => {
            console.log("service worker registration successful");
          })
          .catch(err => {
            console.warn("service worker registration failed", err.message);
          });
      }

      let deferredPrompt;

      window.addEventListener("beforeinstallprompt", e => {
        // Prevent Chrome 67 and earlier from automatically showing the prompt
        e.preventDefault();
        // Stash the event so it can be triggered later.
        deferredPrompt = e;

        deferredPrompt.prompt();

        deferredPrompt.userChoice.then(choiceResult => {
          if (choiceResult.outcome === "accepted") {
            console.log("User accepted the A2HS prompt");
          } else {
            console.log("User dismissed the A2HS prompt");
          }
          deferredPrompt = null;
        });
      });
    }

    // If page was loaded using SSR and token was fetched
    // this will set a timer for a new refresh
    if (this.props.silentRefreshToSet) {
      this.props.setSilentRefresh();
    }

    // to support logging out from all windows
    if (typeof window !== "undefined") {
      window.addEventListener("storage", this.storageEvents);
    }
  }

  componentWillUnmount() {
    // to support logging out from all windows
    if (typeof window !== "undefined") {
      window.removeEventListener("storage", this.storageEvents);
      window.localStorage.removeItem("logout");
      window.localStorage.removeItem("signin");
    }
  }

  storageEvents = (event) => {
    const { signOutSuccess, router, tokenRefresh } = this.props;

    if (event.key === "logout") {
      console.log("logged out from storage!");
      signOutSuccess();
      redirect("/");
    }

    if (event.key === "signin") {
      console.log("signed in from storage!");
      if (router.pathname === "/signIn" || router.pathname === "/signUp") {
        redirect("/app");
      } else {
        tokenRefresh();
      }
    }
  }

  render() {
    const { Component, pageProps, store } = this.props;

    return (
      <Provider store={store}>
        <Component key="appComponnent" {...pageProps} />
      </Provider>
    );
  }
}

export default withRouter(withRedux(initStore)(connect(
  ({ auth: { silentRefreshToSet } }) => ({ silentRefreshToSet }),
  dispatch => ({
    setSilentRefresh: () => dispatch(setSilentRefresh()),
    signOutSuccess: () => dispatch(signOutSuccess()),
    tokenRefresh: () => dispatch(tokenRefresh({}))
  })
)(MyApp)));
