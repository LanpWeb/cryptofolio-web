import React from "react";
import App from "next/app";
import getConfig from "next/config";
import withRedux from "next-redux-wrapper";
import { Provider } from "react-redux";
import { initStore } from "store";

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

export default withRedux(initStore)(MyApp);
