// @flow

import React, { forwardRef } from 'react'
import classnames from 'classnames'
import { RoundCheck } from 'components/icons/RoundCheck'
import { TriangleInfo } from 'components/icons/TriangleInfo'
import { SquareInfo } from 'components/icons/SquareInfo'
import type { Props } from './types'

const Input = forwardRef<Props, HTMLInputElement>(
  (
    {
      name,
      placeholder = 'Email',
      label,
      size,
      height,
      wrapClassName,
      inputClassName,
      acentLabel,
      shape,
      intent,
      disabled,
      onChange,
    },
    ref
  ) => {
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
        input: true,
        input_height_xs: height === 'xs',
        input_height_sm: height === 'sm',
        input_height_md: height === 'md',
        'input_success input_password': intent === 'success',
        'input_warning input_password': intent === 'warning',
        'input_error input_password': intent === 'error',
        input_border_none: shape === 'border-none',
      },
      inputClassName
    )

    const labelClass = classnames({
      'p4 input__label': true,
      input__label_acent: acentLabel === true,
    })

    const renderedIcon = () => {
      if (intent === 'success') {
        return <RoundCheck intent={intent} />
      }
      if (intent === 'warning') {
        return <TriangleInfo intent={intent} />
      }

      return <SquareInfo intent={intent} />
    }

    const renderedInput = () => {
      if (intent) {
        return (
          <div className="input-wrap__inner">
            <input
              ref={ref}
              name={name}
              type="text"
              className={inputClass}
              placeholder={placeholder}
              disabled={disabled}
              onChange={onChange}
            />
            {!disabled && <span className="input__icon">{renderedIcon()}</span>}
          </div>
        )
      }

      return (
        <input
          ref={ref}
          name={name}
          type="text"
          disabled={disabled}
          className={inputClass}
          placeholder={placeholder}
          onChange={onChange}
        />
      )
    }

    return (
      <label className={wrapClass}>
        <>
          {label && <span className={labelClass}>{label}</span>}
          {renderedInput()}
        </>
      </label>
    )
  }
)

export default Input
