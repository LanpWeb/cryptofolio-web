// @flow

import React from 'react'
import classNames from 'classnames'
import Link from 'next/link'
import { withRouter } from 'next/router'
import type { Props } from './types'

const initialItems = [
  {
    title: 'Home',
    route: '/',
  },
  {
    title: 'Sign In',
    route: '/signIn',
  },
  {
    title: 'Sign Up',
    route: '/signUp',
  },
]

const Breadcrumbs = ({ router, className, items = initialItems }: Props) => {
  const brcrClassName = classNames(' breadcrumbs', className)
  return (
    <ul className={brcrClassName}>
      {items.map(({ title, route }) => (
        <li className="breadcrumbs__item" key={title}>
          {route ? (
            <Link href={route}>
              <span
                className={classNames({
                  'breadcrumbs__link p4': true,
                  breadcrumbs__link_active: router.asPath !== route,
                })}
              >
                {title}
              </span>
            </Link>
          ) : (
            <span className="breadcrumbs__link breadcrumbs__link_capitalize p4">
              {title}
            </span>
          )}
        </li>
      ))}
    </ul>
  )
}

export default withRouter(Breadcrumbs)
