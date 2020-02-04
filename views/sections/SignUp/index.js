// @flow

import React, { useState, useCallback } from "react";
import { connect } from "react-redux";

import { signUp } from "ducks/signUp/actions";

import Header from "components/Header";

import type { Props } from "./types";

const SignUp = ({
  progress,
  error,
  signUp
}: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = useCallback(e => {
    e.preventDefault();
    signUp(email, password);
  }, [email, password]);

  return (
    <section className="signUp">
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
          Sign Up
        </button>
      </form>
      <span className="error">{error && error}</span>
    </section>
  );
};

export default connect(
  ({ signUp: { progress, error } }) => ({
    progress, error
  }),
  (dispatch) => ({
    signUp: (email, password) => dispatch(signUp({ email, password }))
  })
)(SignUp);
