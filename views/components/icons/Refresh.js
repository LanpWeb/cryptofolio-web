// @flow

import React from 'react'
import classNames from 'classnames'
import type { Props } from './types'

export const Refresh = ({ className = '' }: Props) => {
  const iconClassName = classNames(
    {
      'icon icon_hovered': true,
    },
    className
  )
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="none"
      xmlns="http://www.w3.org/2000/svg"
      className={iconClassName}
    >
      <g
        clipPath="url(#clip0)"
        fill="none"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M.667 2.667v4h4M15.333 13.334v-4h-4" />
        <path d="M13.66 6a6 6 0 00-9.9-2.24L.667 6.667m14.667 2.666L12.24 12.24A6 6 0 012.34 10" />
      </g>
      <defs>
        <clipPath id="clip0">
          <path fill="#fff" d="M0 0h16v16H0z" />
        </clipPath>
      </defs>
    </svg>
  )
}
