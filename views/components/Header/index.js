/* eslint-disable jsx-a11y/control-has-associated-label */
// @flow

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { connect } from "react-redux";
import classNames from "classnames";
import { signOut } from "ducks/auth/actions";
import SearchBar from "components/SearchBar";
import DropList from "components/DropList";
import Logo from "components/icons/Logo";
import type { Props } from "./types";

const Header = ({
  auth, email, signOut, loadWatchlist, loadAllCoins
}: Props) => {
  const [dropIsOpen, setDropOpen] = useState(false);

  const menuOption = [
    {
      name: "Settings",
      id: 1,
      route: "/"
    },
    {
      name: "Log out",
      id: 2,
      handler: signOut
    },
  ];
  const getTabs = useMemo(() => {
    if (!auth) {
      return (
        <li className="header__item">
          <button onClick={loadAllCoins} className="pure-btn c2 fw-medium header__link">All coins</button>
        </li>
      );
    }

    return (
      <>
        <li className="header__item">
          <Link href="/" as="/app">
            <button onClick={loadAllCoins} className="pure-btn c2 fw-medium header__link">All coins</button>
          </Link>
        </li>
        <li className="header__item">
          <Link href="/" as="/app">
            <button onClick={loadWatchlist} className="pure-btn c2 fw-medium header__link">Watchlist</button>
          </Link>
        </li>
        <li className="header__item">
          <Link href="/portfolio" as="/app">
            <span className="c2 fw-medium header__link aic">Portfolio</span>
          </Link>
        </li>

      </>
    );
  }, [auth, loadWatchlist, loadAllCoins]);

  const getButton = useMemo(() => {
    const dropOpenHandler = () => {
      setDropOpen(dropIsOpen === false);
    };
    const userMenuClassName = classNames("header-user", { "header-user_active": dropIsOpen });
    if (!auth) {
      return (
        <Link href="/signIn" as="/sign-in">
          <span className="btn btn_xs btn_outline header__btn">Sign In </span>
        </Link>
      );
    }
    return (

      <div className={userMenuClassName} onClick={dropOpenHandler}>
        <p className="c2 header-user__title fw-medium">
          {email}
        </p>
        <div className="header-user__arrow" />
        <DropList active={dropIsOpen} className="header-user__menu" options={menuOption} />
      </div>

    );
  }, [auth, email, dropIsOpen, menuOption]);

  return (
    <header className="header">
      <div className="container aic jcsb header__inner">
        <nav className="header__nav aic">
          <Link href="/">
            <span className="header__logo"><Logo className="header__icon" /></span>
          </Link>
          <ul className="header__list aic">
            {getTabs}
          </ul>
        </nav>
        <div className="header__tools aic">
          <SearchBar />
          {getButton}
        </div>
      </div>
    </header>
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
