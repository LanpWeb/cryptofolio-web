// @flow

import React from 'react'
import classNames from 'classnames'
import type { Props } from './types'

export const File = ({ className = '', intent = '' }: Props) => {
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
        d="M8.5 2H5a.956.956 0 00-.707.322A1.158 1.158 0 004 3.1v8.8c0 .292.105.572.293.778A.956.956 0 005 13h6c.265 0 .52-.116.707-.322.188-.207.293-.486.293-.778V5.85L8.5 2z"
        fill="none"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 2v5h4"
        fill="none"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
