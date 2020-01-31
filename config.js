// @flow

import getConfig from "next/config";

const nodeEnv = process.env.NODE_ENV;

const developmentURL = "http://localhost:3004";
const serverDevURL = "";
const serverProdURL = "";

let baseURL;

if (nodeEnv === "test") {
  baseURL = developmentURL;
} else {
  const { publicRuntimeConfig } = getConfig();
  const { env } = publicRuntimeConfig;

  const getBaseURL = (environment: string) => {
    if (environment === "development") {
      return developmentURL;
    } if (environment === "server-dev") {
      return serverDevURL;
    } if (environment === "server-prod") {
      return serverProdURL;
    }
    return serverDevURL;
  };

  baseURL = getBaseURL(env);
}

const apiURL = `${baseURL}/api`;

export {
  baseURL,
  apiURL
};
