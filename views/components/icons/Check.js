// @flow

import React from 'react'
import classNames from 'classnames'
import type { Props } from './types'

export const Check = ({ className = '', intent = '' }: Props) => {
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
      viewBox="0 0 8 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={iconClassName}
    >
      <path d="M6.88 0L8 1.058 2.776 6 0 3.375l1.12-1.058 1.656 1.56L6.88 0z" />
    </svg>
  )
}
