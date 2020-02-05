// @flow
export type State = {
  progress: boolean,
  error: null | string
};

export type SignUpPayload = {
  payload: {
    email: string,
    password: string,
    confirmPassword: string
  }
};
