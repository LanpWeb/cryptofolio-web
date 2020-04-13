// @flow

import React, { useState } from 'react'
import classNames from 'classnames'
import type { Props } from './types'

const DateSelect = ({ disabled, start = '', end = '', className }: Props) => {
  const dateSelectClassName = classNames('date-select aic', className)

  const [startDate, setStartDate] = useState(start)
  const [endDate, setEndDate] = useState(end)
  const [openCalendar, setOpenCalendar] = useState('')

  const startDateHandler = (newDate) => {
    setStartDate(newDate)
    setOpenCalendar('')
  }

  const endDateHandler = (newDate) => {
    setEndDate(newDate)
    setOpenCalendar('')
  }

  return (
    <div className={dateSelectClassName}>
      <input
        value={startDate}
        type="text"
        className="input input_height_xs date-select__input "
        placeholder={!disabled ? 'Start' : ''}
        maxLength="10"
        disabled={disabled}
        onChange={(e) => startDateHandler(e.target.value)}
        onClick={() => {
          if (openCalendar !== 'startCalendar') {
            setOpenCalendar('startCalendar')
          } else {
            setOpenCalendar('')
          }
        }}
      />
      <span className="date-select__separator centered">-</span>
      <input
        value={endDate}
        type="text"
        className="input input_height_xs date-select__input"
        placeholder={!disabled ? 'End' : ''}
        maxLength="10"
        disabled={disabled}
        onChange={(e) => endDateHandler(e.target.value)}
        onClick={() => {
          if (openCalendar !== 'endCalendar') {
            setOpenCalendar('endCalendar')
          } else {
            setOpenCalendar('endCalendar')
          }
        }}
      />
    </div>
  )
}

export default DateSelect
