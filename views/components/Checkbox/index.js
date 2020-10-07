// @flow

import React, { forwardRef, useCallback, useState } from 'react'
import classNames from 'classnames'
import { Check } from 'components/icons/Check'
import type { Props } from './types'

const Checkbox = forwardRef<Props, HTMLInputElement>(
  ({ name, onChange, checked = false, label, className, intent }, ref) => {
    const [isChecked, setChecked] = useState(checked)

    const toggle = useCallback(() => {
      const newValue = !isChecked
      setChecked(newValue)
      onChange?.(newValue)
    }, [isChecked, onChange])

    const checkClassName = classNames('checkbox aic', className)
    const customCheckClassName = classNames({
      checkbox__custom: true,
      checkbox__custom_primary: intent === 'primary',
      checkbox__custom_error: intent === 'error',
      checkbox__custom_success: intent === 'success',
    })

    const labelClassName = classNames({
      'p3 checkbox__label-text': true,
      'checkbox__label-text_primary': intent === 'primary',
      'checkbox__label-text_error': intent === 'error',
      'checkbox__label-text_success': intent === 'success',
    })

    return (
      <label className={checkClassName}>
        <input
          ref={ref}
          name={name}
          checked={isChecked}
          type="checkbox"
          className="checkbox__real"
          onChange={toggle}
        />
        <span className={customCheckClassName}>
          <Check customClassName="checkbox__icon" intent={intent} />
        </span>
        {label && <span className={labelClassName}>{label}</span>}
      </label>
    )
  }
)

export default Checkbox
