// @flow

export type FormData = {
  email: string,
  password: string,
}

export type Props = {
  progress: boolean,
  signUp: (email: string, password: string) => void,
}
