// @flow

import React, { forwardRef, useCallback, useState } from 'react'
import classNames from 'classnames'
import type { Props } from './types'

const initialItems = [{ text: 'Buy' }, { text: 'Sell' }]

const ButtonToogle = forwardRef<Props, HTMLInputElement>(
  (
    {
      name,
      className,
      checked = false,
      disabled,
      bg,
      items = initialItems,
      onChange,
    },
    ref
  ) => {
    const [isChecked, setChecked] = useState(checked)

    const toggle = useCallback(() => {
      const newValue = !isChecked
      setChecked(newValue)
      onChange?.(newValue)
    }, [isChecked, onChange])

    const buttonToogleClassName = classNames(
      'button-toogle',
      {
        'button-toogle_disabled': disabled,
        'button-toogle_bg_white': bg === 'white',
      },
      className
    )

    const renderedItems = items.map(({ text }) => (
      <span className="button-toogle__text c3 aic">{text}</span>
    ))

    return (
      <label className={buttonToogleClassName}>
        <>
          <input
            ref={ref}
            name={name}
            type="checkbox"
            className="button-toogle__real"
            checked={isChecked}
            disabled={disabled}
            onChange={toggle}
          />
          <div className="button-toogle__switch" />
          <div className="button-toogle__custom aic">{renderedItems}</div>
        </>
      </label>
    )
  }
)

export default ButtonToogle
