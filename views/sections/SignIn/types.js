// @flow

export type Props = {
  progress: boolean,
  error: null | string,
  signIn: (email: string, password: string) => void,
}
