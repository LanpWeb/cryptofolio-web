// @flow

import React, { useState, useCallback, useEffect } from "react";
import { connect } from "react-redux";

import { signIn } from 'ducks/signIn/actions'

import Link from "next/link";
import Input from "components/Input";
import PasswordInput from "components/PasswordInput";
import Logo from "components/icons/Logo";
import Button from "components/Button";
import Google from "components/icons/socials/Google";
import { Facebook } from "components/icons/socials/Facebook";


import type { Props } from "./types";

const SignIn = ({ progress, error, signIn }: Props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const submit = useCallback(
    (e) => {
      e.preventDefault()
      signIn(email, password)
    },
    [signIn, email, password]
  )

  useEffect(() => {
    const _onInit = auth2 => {
      console.log("init OK", auth2);
    };
    const _onError = err => {
      console.log("error", err);
    };
    window.gapi.load("auth2", () => {
      window.gapi.auth2
        .init({
          client_id: "172622657837-ac622rrsh2miq8din8h5muof9ki40927.apps.googleusercontent.com",
        })
        .then(_onInit, _onError);
    });
  });

  const googleSignIn = (e) => {
    e.preventDefault();
    const auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signIn().then(googleUser => {
      const profile = googleUser.getBasicProfile();
      console.log(`ID: ${profile.getId()}`);
      console.log(`Image URL: ${profile.getImageUrl()}`);
      console.log(`Email: ${profile.getEmail()}`);
      const { id_token } = googleUser.getAuthResponse();
      console.log(`ID Token: ${id_token}`);
    });
  };

  return (
    <section className="sign centered">
      <Link href="/">
        <span className="sign__logo">
          <Logo   />
        </span>
      </Link>
      <form onSubmit={submit} className="sign__form aic">
        <span className="sign__caption">Sign In</span>
        <Input value={email} placeholder="Email" handleChange={setEmail} wrapClassName="sign__email" />
        <PasswordInput value={password} placeholder="Password" handleChange={setPassword} wrapClassName="sign__pass" />
        <Button type="submit" disabled={progress} height="lg" className="sign__submit">
          Sign In
        </Button>
        <Button shape="text">Forgot a password?</Button>
        <div className="sign__footer jcc">
          <Button className="sign__social" shape="social" handleClick={googleSignIn}>
            <Google className="sign__google" />
            Google
          </Button>
          <Button className="sign__social" shape="social">
            <span><Facebook className="sign__facebook" /></span>
            Facebook
          </Button>
        </div>
      </form>
      <span className="sign__acc-info">
        No account yet?
        <Link href="/signUp" as="/sign-up">
          <span className="sign__link">Sign Up</span>
        </Link>

      </span>
      <span className="error">{error && error}</span>
    </section>
  )
}

export default connect(
  ({ signIn: { progress, error } }) => ({
    progress,
    error,
  }),
  (dispatch) => ({
    signIn: (email, password) => dispatch(signIn({ email, password })),
  })
)(SignIn)
