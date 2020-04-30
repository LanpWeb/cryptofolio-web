// @flow

import React, { useCallback } from 'react'
import { connect } from 'react-redux'
import { useForm } from 'react-hook-form'
import { signUp } from 'ducks/signUp/actions'
import Link from 'next/link'
import Input from 'components/Input'
import PasswordInput from 'components/PasswordInput'
import Logo from 'components/icons/Logo'
import Button from 'components/Button'
import type { Props } from './types'

const SignUp = ({ progress, signUp }: Props) => {
  const { register, handleSubmit } = useForm()
  const onSubmit = useCallback(
    ({ email, password }) => {
      signUp(email, password)
    },
    [signUp]
  )

  return (
    <section className="sign centered">
      <Link href="/">
        <span className="sign__logo">
          <Logo />
        </span>
      </Link>
      <form onSubmit={handleSubmit(onSubmit)} className="sign__form aic">
        <>
          <span className="sign__caption">Sign Up</span>
          <Input
            ref={register}
            name="email"
            placeholder="Email"
            wrapClassName="sign__email"
          />
          <PasswordInput
            ref={register}
            name="password"
            placeholder="Password"
            wrapClassName="sign__pass"
          />
          <Button
            type="submit"
            disabled={progress}
            height="lg"
            className="sign__submit"
          >
            Sign Up
          </Button>
        </>
      </form>
      <span className="sign__acc-info">
        Already have an account?
        <Link href="/signIn" as="/sign-in">
          <span className="sign__link">Sign In</span>
        </Link>
      </span>
    </section>
  )
}

export default connect(
  ({ signUp: { progress } }) => ({
    progress,
  }),
  (dispatch) => ({
    signUp: (email, password) => dispatch(signUp({ email, password })),
  })
)(SignUp)
