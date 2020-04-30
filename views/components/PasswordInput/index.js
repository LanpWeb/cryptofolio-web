// @flow

import React, { forwardRef, useCallback, useState } from 'react'
import classnames from 'classnames'
import { CloseEye } from 'components/icons/CloseEye'
import { Eye } from 'components/icons/Eye'
import type { Props } from './types'

const PasswordInput = forwardRef<Props, HTMLInputElement>(
  (
    {
      name,
      placeholder = 'Enter password',
      label,
      inputClassName,
      wrapClassName,
      size,
      height,
      shape,
      intent,
      acentLabel,
      disabled,
      onChange,
    },
    ref
  ) => {
    const [inputType, changeInputType] = useState('password')

    const handleInputTypeChange = useCallback(() => {
      changeInputType((state) => (state === 'password' ? 'text' : 'password'))
    }, [])

    const wrapClass = classnames(
      {
        'input-wrap': true,
        'input-wrap_xs': size === 'xs',
        'input-wrap_sm': size === 'sm',
        'input-wrap_md': size === 'md',
        'input-wrap_lg': size === 'lg',
        'input-wrap_auto': size === 'auto',
      },
      wrapClassName
    )
    const inputClass = classnames(
      {
        'input input_password': true,
        input_height_xs: height === 'xs',
        input_height_sm: height === 'sm',
        input_height_md: height === 'md',
        input_success: intent === 'success',
        input_warning: intent === 'warning',
        input_error: intent === 'error',
        input_border_none: shape === 'border-none',
      },
      inputClassName
    )
    const labelClass = classnames({
      'p4 input__label': true,
      input__label_acent: acentLabel === true,
    })

    const renderedAddon = !disabled && (
      <button
        className="pure-btn input__password-btn"
        onClick={handleInputTypeChange}
        disabled={disabled}
      >
        {inputType === 'password' ? <CloseEye /> : <Eye active />}
      </button>
    )

    return (
      <label className={wrapClass}>
        {label && <span className={labelClass}>{label}</span>}
        <div className="input-wrap__inner">
          <>
            <input
              ref={ref}
              name={name}
              type={inputType}
              className={inputClass}
              placeholder={placeholder}
              disabled={disabled}
              onChange={onChange}
            />
            {renderedAddon}
          </>
        </div>
      </label>
    )
  }
)

export default PasswordInput
