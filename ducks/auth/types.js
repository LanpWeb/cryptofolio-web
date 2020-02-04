// @flow
import type { NextPageContext } from "next";

export type State = {
  silentRefreshToSet: boolean,
  jwt: {
    auth: boolean,
    accessToken: null | string,
    exp: null | Number
  },
  id: null | string,
  email: null | string,
  progress: boolean,
  error: null | string
};

export type RefreshTokenPayload = {
  payload: {
    isServer: boolean,
    refreshToken?: string,
    ctx?: NextPageContext
  }
}

export type JWTDataPayload = {
  payload: {
    accessToken: string,
    isServer: boolean
  }
}
