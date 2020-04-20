// @flow

import React from 'react'
import classNames from 'classnames'
import type { Props } from './types'

const Button = ({
  size,
  type = 'button',
  height,
  shape,
  children,
  className,
  disabled = false,
  handleClick,
  icon,
}: Props) => {
  const btnClassName = classNames('btn', className, {
    btn_height_lg: height === 'lg',
    btn_xs: size === 'xs',
    btn_sm: size === 'sm',
    btn_md: size === 'md',
    btn_lg: size === 'lg',
    btn_auto: size === 'auto',
    btn_outline: shape === 'outline',
    btn_social: shape === 'social',
    btn_text: shape === 'text',
  })
  return (
    <button
      className={btnClassName}
      onClick={handleClick}
      disabled={disabled}
      type={type}
    >
      {icon && <span className="icon-frame btn__icon">{icon}</span>}
      {children}
    </button>
  )
}

export default Button
