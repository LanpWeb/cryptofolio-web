// @flow

import React, { useMemo } from "react";
import Link from "next/link";
import { connect } from "react-redux";

import { signOut } from "ducks/auth/actions";

import type { Props } from "./types";

const Header = ({
  auth,
  signOut
}: Props) => {
  const getTabs = useMemo(() => {
    if (!auth) {
      return (
        <React.Fragment key="without-token">
          <Link href="/sign-in">
            <a>
              Sign In
            </a>
          </Link>
          <Link href="/sign-up">
            <a>
              Sign Up
            </a>
          </Link>
        </React.Fragment>
      );
    }

    return (
      <React.Fragment key="with-token">
        <Link href="/app">
          <a>
            Portfolio
          </a>
        </Link>
        <button onClick={signOut}>
          Sign Out
        </button>
      </React.Fragment>
    );
  }, [auth, signOut]);

  return (
    <div className="header centered">
      <Link href="/">
        <a>
          Home
        </a>
      </Link>
      {getTabs}
    </div>
  );
};

export default connect(
  ({ auth: { jwt: { auth } } }) => ({
    auth
  }),
  (dispatch) => ({
    signOut: () => dispatch(signOut())
  })
)(Header);
