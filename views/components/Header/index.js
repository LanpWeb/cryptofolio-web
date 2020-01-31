// @flow

import React from "react";
import Link from "next/link";

export default () => (
  <div className="header centered">
    <Link href="/">
      <a>
        Home
      </a>
    </Link>
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
  </div>
);
