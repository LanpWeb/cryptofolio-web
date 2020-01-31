// @flow

import React, { useState } from "react";
import Router from "next/router";
import axios from "axios";

import { apiURL } from "config";
import { setAccessToken } from "utils/accessToken";

import Header from "components/Header";

const SignUp = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const submit = async e => {
    e.preventDefault();

    const res = await axios.post(`${apiURL}/sign-up`, {
      email,
      password
    });

    setAccessToken(res.data.accessToken);

    Router.push("/app");
  };

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
        <button type="submit">
          Sign Up
        </button>
      </form>
    </section>
  );
};

export default SignUp;
