// @flow
export type State = {
  progress: boolean,
  error: null | string,
}

export type SignInPayload = {
  payload: {
    email: string,
    password: string,
  },
}
