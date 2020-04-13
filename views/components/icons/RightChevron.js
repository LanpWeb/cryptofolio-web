// @flow

import React from 'react'
import classNames from 'classnames'
import type { Props } from './types'

export const RightChevron = ({ className = '' }: Props) => {
  const iconClassName = classNames(
    {
      'icon icon_hovered': true,
    },
    className
  )
  return (
    <svg
      viewBox="0 0 16 16"
      stroke="none"
      xmlns="http://www.w3.org/2000/svg"
      className={iconClassName}
    >
      <path
        d="M6 4l4 4-4 4"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  )
}
