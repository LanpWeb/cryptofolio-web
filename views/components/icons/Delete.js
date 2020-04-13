// @flow

import React from 'react'
import classNames from 'classnames'
import type { Props } from './types'

export const Delete = ({ className = '' }: Props) => {
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
      <path d="M13 2.667h-2.5L9.786 2H6.214l-.714.667H3V4h10V2.667zm-9.286 10c0 .353.15.692.419.943.268.25.631.39 1.01.39h5.714c.379 0 .742-.14 1.01-.39s.419-.59.419-.943v-8H3.714v8z" />
    </svg>
  )
}
