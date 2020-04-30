// @flow

export type FormData = {
  email: string,
  password: string,
}

export type Props = {
  progress: boolean,
  signIn: (email: string, password: string) => void,
}
