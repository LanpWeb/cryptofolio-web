// @flow

import React, { useCallback } from 'react'
import { connect } from 'react-redux'
import { useForm } from 'react-hook-form'
import { signIn } from 'ducks/signIn/actions'
import Link from 'next/link'
import Input from 'components/Input'
import PasswordInput from 'components/PasswordInput'
import Logo from 'components/icons/Logo'
import Button from 'components/Button'
import type { Props } from './types'

const SignIn = ({ progress, signIn }: Props) => {
  const { register, handleSubmit } = useForm()
  const onSubmit = useCallback(
    ({ email, password }) => {
      signIn(email, password)
    },
    [signIn]
  )

  return (
    <section className="sign centered">
      <Link href="/">
        <span className="sign__logo">
          <Logo />
        </span>
      </Link>
      <form onSubmit={handleSubmit(onSubmit)} className="sign__form aic">
        <span className="sign__caption">Sign In</span>
        <Input
          ref={register}
          name="email"
          placeholder="Email"
          size="auto"
          wrapClassName="sign__email"
        />
        <PasswordInput
          ref={register}
          name="password"
          size="auto"
          placeholder="Password"
          wrapClassName="sign__pass"
        />
        <Button
          type="submit"
          size="auto"
          disabled={progress}
          height="lg"
          className="sign__submit"
        >
          Sign In
        </Button>
        <Button shape="text" className="sign__forgot">
          Forgot a password?
        </Button>
      </form>
      <span className="sign__acc-info">
        No account yet?
        <Link href="/signUp" as="/sign-up">
          <span className="sign__link">Sign Up</span>
        </Link>
      </span>
    </section>
  )
}

export default connect(
  ({ signIn: { progress } }) => ({
    progress,
  }),
  (dispatch) => ({
    signIn: (email, password) => dispatch(signIn({ email, password })),
  })
)(SignIn)
