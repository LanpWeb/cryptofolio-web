// @flow

import React from 'react'
import classNames from 'classnames'
import type { Props } from './types'

export const Site = ({ className = '', intent = '' }: Props) => {
  const iconClassName = classNames({}, className)
  return (
    <svg
      viewBox="0 0 16 16"
      className={iconClassName}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.27 5h1.78a2.92 2.92 0 012.73 1.85 3.04 3.04 0 01-1.6 3.92c-.36.15-.75.23-1.13.23H9.27m-3.54 0H3.95a2.92 2.92 0 01-2.08-.88 3.02 3.02 0 010-4.24C2.42 5.32 3.17 5 3.95 5h1.78M5 8h5"
        stroke="#4C80EC"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
