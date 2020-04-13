// @flow

export type Props = {
  progress: boolean,
  error: null | string,
  signUp: (email: string, password: string, confirmPassword: string) => void,
}
