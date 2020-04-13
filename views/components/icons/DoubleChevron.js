// @flow

import React from 'react'
import classNames from 'classnames'
import type { Props } from './types'

export const DoubleChevron = ({ className = '', intent = '' }: Props) => {
  const iconClassName = classNames(
    {
      icon: true,
      icon_primary: intent === 'primary',
      icon_error: intent === 'error',
      icon_success: intent === 'success',
      icon_warning: intent === 'warning',
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
        d="M10 12l4-4-4-4M6 4L2 8l4 4"
        fill="none"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
