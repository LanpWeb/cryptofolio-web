/* eslint-disable jsx-a11y/control-has-associated-label */
// @flow

import React, { useMemo, useState } from 'react'
import Link from 'next/link'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { signOut } from 'ducks/auth/actions'
import SearchBar from 'components/SearchBar'
import DropList from 'components/DropList'
import Logo from 'components/icons/Logo'
import { withRouter } from 'next/router'
import type { Props } from './types'

const initialItems = [
  {
    title: 'All coins',
    route: '/',
  },
  {
    title: 'Watchlist',
    route: '/watchlist',
  },
  {
    title: 'Portfolio',
    route: '/portfolio',
  },
]
const Header = ({
  auth,
  email,
  signOut,
  router,
  items = initialItems,
}: Props) => {
  const [dropIsOpen, setDropOpen] = useState(false)

  const menuOption = [
    {
      name: 'Settings',
      id: 1,
      route: '/',
    },
    {
      name: 'Log out',
      id: 2,
      handler: signOut,
    },
  ]
  const getTabs = useMemo(() => {
    if (!auth) {
      return (
        <li className="header__item">
          <span className="c2 fw-medium header__link header__link_active aic">
            All coins
          </span>
        </li>
      )
    }
    return (
      <>
        {items.map(({ title, route }) => (
          <li className="header__item" key={title}>
            <Link href={route}>
              <span
                className={classNames({
                  'c2 fw-medium header__link aic': true,
                  header__link_active: router.asPath === route,
                })}
              >
                {title}
              </span>
            </Link>
          </li>
        ))}
      </>
    )
  }, [auth, items, router.asPath])

  const getButton = useMemo(() => {
    const dropOpenHandler = () => {
      setDropOpen(dropIsOpen === false)
    }
    const userMenuClassName = classNames('header-user', {
      'header-user_active': dropIsOpen,
    })
    if (!auth) {
      return (
        <Link href="/signIn" as="/sign-in">
          <span className="btn btn_xs btn_outline header__btn">Sign In </span>
        </Link>
      )
    }
    return (
      <div className={userMenuClassName} onClick={dropOpenHandler}>
        <p className="c2 header-user__title fw-medium">{email}</p>
        <div className="header-user__arrow" />
        <DropList
          active={dropIsOpen}
          className="header-user__menu"
          options={menuOption}
        />
      </div>
    )
  }, [auth, email, dropIsOpen, menuOption])

  return (
    <header className="header">
      <div className="container aic jcsb header__inner">
        <nav className="header__nav aic">
          <Link href="/">
            <span className="header__logo">
              <Logo className="header__icon" />
            </span>
          </Link>
          <ul className="header__list aic">{getTabs}</ul>
        </nav>
        <div className="header__tools aic">
          <SearchBar />
          {getButton}
        </div>
      </div>
    </header>
  )
}

export default withRouter(
  connect(
    ({
      auth: {
        jwt: { auth },
        email,
      },
    }) => ({
      auth,
      email,
    }),
    (dispatch) => ({
      signOut: () => dispatch(signOut()),
    })
  )(Header)
)
