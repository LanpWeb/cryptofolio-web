// @flow

import React, { useState } from 'react'
import classNames from 'classnames'
import type { Props } from './types'

const initialOptions = [
  {
    name: 'All coins',
    id: 1,
  },
  {
    name: 'Bitcoin',
    id: 2,
  },
  {
    name: 'Etherium',
    id: 3,
  },
  {
    name: 'Litecoin',
    id: 4,
  },
]
const DropMenu = ({ options = initialOptions, className }: Props) => {
  const [isOpened, openDrop] = useState(false)
  const [selectedOption, setSelectedOption] = useState(options[0])

  const dropmenuClassName = classNames(
    {
      dropmenu: true,
      dropmenu_open: isOpened === true,
    },
    className
  )

  return (
    <div
      className={dropmenuClassName}
      onClick={() => openDrop(isOpened === false)}
    >
      <p className="p3 dropmenu__title ">{selectedOption.name}</p>
      <div className="dropmenu__arrow" />
      <div className="dropmenu__content">
        {options.map((option) => (
          <div
            className={classNames({
              dropmenu__option: true,
              dropmenu__option_active: selectedOption.id === option.id,
            })}
            onClick={() => setSelectedOption(option)}
            key={option.id}
          >
            <p className="p3 dropmenu__text">{option.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DropMenu
