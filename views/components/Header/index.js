// @flow

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { connect } from "react-redux";
import { signOut } from "ducks/auth/actions";
import Search from "components/Search";
import type { Props } from "./types";

const Header = ({ auth, email, signOut }: Props) => {
  const [isToogle, setToogle] = useState(true);
  const closeToastHandler = () => {
    setToogle(false);
  };

  const getTabs = useMemo(() => {
    if (!auth) {
      return (
        <React.Fragment key="without-token">
          <Link href="/signIn" as="/sign-in">
            <a className="link">Sign In </a>
          </Link>

          <Link href="/signUp" as="/sign-up">
            <a className="btn btn_text">Sign Up</a>
          </Link>
        </React.Fragment>
      );
    }

    return (
      <React.Fragment key="with-token">
        <Link href="/portfolio" as="/app">
          <a>Portfolio</a>
        </Link>
        {email && <span>{`Hi, ${email}!`}</span>}
        <button onClick={signOut}>Sign Out</button>
      </React.Fragment>
    );
  }, [auth, email, signOut]);

  return (
    <div className="header centered">
      <Link href="/">
        <a className="btn btn_text">Home</a>
      </Link>
      {getTabs}
      <Search />
    </div>
  );
};

export default connect(
  ({
    auth: {
      jwt: { auth },
      email
    }
  }) => ({
    auth,
    email
  }),
  dispatch => ({
    signOut: () => dispatch(signOut())
  })
)(Header);
