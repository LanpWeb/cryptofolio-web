// @flow

import React, { forwardRef } from 'react'
import classNames from 'classnames'
import type { Props } from './types'

const initialItems = [{ text: 'Buy' }, { text: 'Sell' }]

const ButtonToogle = forwardRef<Props, HTMLInputElement>(
  ({ name, className, disabled, bg, items = initialItems, onChange }, ref) => {
    const buttonToogleClassName = classNames(
      'button-toogle',
      {
        'button-toogle_disabled': disabled,
        'button-toogle_bg_white': bg === 'white',
      },
      className
    )

    return (
      <label className={buttonToogleClassName}>
        <input
          ref={ref}
          name={name}
          type="checkbox"
          className="button-toogle__real"
          disabled={disabled}
          onChange={onChange}
        />
        <div className="button-toogle__switch" />
        <div className="button-toogle__custom aic">
          {items.map(({ text }) => (
            <span className="button-toogle__text c3 aic">{text}</span>
          ))}
        </div>
      </label>
    )
  }
)

export default ButtonToogle
