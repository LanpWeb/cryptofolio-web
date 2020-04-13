// @flow

import React from 'react'
import classNames from 'classnames'
import type { Props } from './types'

export const Edit = ({ className = '' }: Props) => {
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
      xmlns="http://www.w3.org/2000/svg"
      className={iconClassName}
    >
      <path d="M13.807 4.693a.664.664 0 000-.94l-1.56-1.56a.664.664 0 00-.94 0l-1.227 1.22 2.5 2.5 1.227-1.22zM2 11.5V14h2.5l7.373-7.38-2.5-2.5L2 11.5z" />
    </svg>
  )
}
