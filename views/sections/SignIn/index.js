// @flow

import React, { useState, useCallback } from "react";
import { connect } from "react-redux";

import { signIn } from "ducks/signIn/actions";

import Header from "components/Header";

import type { Props } from "./types";

const SignIn = ({
  progress,
  error,
  signIn
}: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = useCallback(e => {
    e.preventDefault();
    signIn(email, password);
  }, [signIn, email, password]);

  return (
    <section className="signIn">
      <Header />
      <form onSubmit={submit}>
        <input
          value={email}
          type="text"
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
        />
        <input
          value={password}
          type="text"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />
        <button
          type="submit"
          disabled={progress}
        >
          Sign In
        </button>
      </form>
      <span className="error">{error && error}</span>
    </section>
  );
};

export default connect(
  ({ signIn: { progress, error } }) => ({
    progress, error
  }),
  (dispatch) => ({
    signIn: (email, password) => dispatch(signIn({ email, password }))
  })
)(SignIn);
