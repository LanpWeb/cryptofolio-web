// @flow

import React from 'react'
import classNames from 'classnames'
import type { Props } from './types'

export const TriangleInfo = ({ className = '', intent = '' }: Props) => {
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
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={iconClassName}
    >
      <path d="M8.727 9.842H7.273V6.895h1.454v2.947zm0 2.947H7.273v-1.473h1.454v1.473zM0 15h16L8 1 0 15z" />
    </svg>
  )
}
