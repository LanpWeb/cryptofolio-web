// @flow

export type PasswordChangeFormData = {
  oldPassword: string,
  newPassword: string,
  confirmNewPassword: string,
}

export type EmailChangeFormData = {
  email: string,
  password: string,
}
