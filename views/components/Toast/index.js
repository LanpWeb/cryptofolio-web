// @flow

import React from 'react'
import classNames from 'classnames'
import { Close } from 'components/icons/Close'
import { RoundCheck } from 'components/icons/RoundCheck'
import type { Props } from './types'

const Toast = ({
  active = false,
  closeToast = () => {},
  text = 'Password was changed',
  time = '21:22',
  intent,
  className,
}: Props) => {
  const toastClassName = classNames(
    {
      'toast jcsb': true,
      toast_active: active === true,
    },
    className
  )

  return (
    <div className={toastClassName}>
      <div className="toast__inner">
        <div className="toast__content aic">
          <span className="toast__icon">
            <RoundCheck intent={intent} />
          </span>
          <p className="c3 toast__text fw-medium">{text}</p>
        </div>
        <span className="toast__time p4">{time}</span>
      </div>
      <button className="pure-btn toast__close" onClick={closeToast}>
        <Close />
      </button>
    </div>
  )
}

export default Toast
