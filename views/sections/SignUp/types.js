// @flow

export type FormData = {
  email: string,
  password: string,
  confirmPassword: string,
}

export type Props = {
  progress: boolean,
  signUp: (email: string, password: string, confirmPassword: string) => void,
}
