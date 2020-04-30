// @flow

import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import Header from 'components/Header'
import Input from 'components/Input'
import PasswordInput from 'components/PasswordInput'
import Button from 'components/Button'
import type { EmailChangeFormData, PasswordChangeFormData } from './types'

const Settings = () => {
  const {
    register: emailChangeRegister,
    handleSubmit: handleEmailChangeSubmit,
  } = useForm<EmailChangeFormData>()
  const {
    register: passwordChangeRegister,
    handleSubmit: handlePasswordChangeSubmit,
  } = useForm<PasswordChangeFormData>()

  const onSubmitEmailChange = useCallback(() => {
    // args - data: EmailChangeFormData
    // make api request with data here
  }, [])

  const onSubmitPasswordChange = useCallback(() => {
    // args - data: PasswordChangeFormData
    // make api request with data here
  }, [])

  return (
    <section className="settings">
      <Header className="settings__header" />
      <div className="container settings__inner">
        <div className="settings__wrapper">
          <h2 className="h2 settings__caption">Settings</h2>
          <form
            onSubmit={handleEmailChangeSubmit(onSubmitEmailChange)}
            className="settings__form"
          >
            <>
              <h3 className="c2 fw-semi-bold settings__subcaption">
                Email change
              </h3>
              <Input
                ref={emailChangeRegister}
                name="email"
                label="Current email"
                shape="border-none"
                size="auto"
                acentLabel
                wrapClassName="settings__field"
              />
              <PasswordInput
                ref={emailChangeRegister}
                name="password"
                label="Confirm password"
                shape="border-none"
                size="auto"
                acentLabel
                wrapClassName="settings__field settings__field_last"
              />
              <Button
                type="submit"
                size="auto"
                height="lg"
                className="settings__btn"
              >
                Update email
              </Button>
            </>
          </form>
          <form
            onSubmit={handlePasswordChangeSubmit(onSubmitPasswordChange)}
            className="settings__form"
          >
            <>
              <h3 className="c2 fw-semi-bold settings__subcaption">
                Password change
              </h3>
              <PasswordInput
                ref={passwordChangeRegister}
                name="oldPassword"
                label="Old password"
                shape="border-none"
                size="auto"
                acentLabel
                wrapClassName="settings__field"
              />
              <PasswordInput
                ref={passwordChangeRegister}
                name="newPassword"
                label="New password"
                shape="border-none"
                size="auto"
                acentLabel
                wrapClassName="settings__field"
              />
              <PasswordInput
                ref={passwordChangeRegister}
                name="confirmNewPassword"
                label="Confirm new password"
                shape="border-none"
                size="auto"
                acentLabel
                wrapClassName="settings__field settings__field_last"
              />
              <Button
                type="submit"
                size="auto"
                height="lg"
                className="settings__btn"
              >
                Change password
              </Button>
            </>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Settings
