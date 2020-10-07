// @flow

import React, { useState } from 'react'
import classNames from 'classnames'
import type { Props } from './types'

const initialOptions = [
  {
    name: 'All coins',
    id: 1,
    handler: () => {},
  },
  {
    name: 'Bitcoin',
    id: 2,
    handler: () => {},
  },
  {
    name: 'Etherium',
    id: 3,
    handler: () => {},
  },
  {
    name: 'Litecoin',
    id: 4,
    handler: () => {},
  },
]

const DropMenu = ({
  options = initialOptions,
  className,
  color,
  disabled,
}: Props) => {
  const [isOpened, openDrop] = useState(false)
  const [selectedOption, setSelectedOption] = useState(options[0])

  const dropmenuClassName = classNames(
    {
      dropmenu: true,
      dropmenu_open: isOpened === true && !disabled,
    },
    className
  )

  const titleClassName = classNames('p3 dropmenu__title', {
    dropmenu__title_grey: color === 'grey',
    dropmenu__title_disabled: disabled,
  })

  const arrowClassName = classNames('dropmenu__arrow', {
    dropmenu__arrow_grey: color === 'grey',
    dropmenu__arrow_disabled: disabled,
  })

  return (
    <div
      className={dropmenuClassName}
      onClick={() => openDrop(isOpened === false)}
    >
      <p className={titleClassName}>{selectedOption.name}</p>
      <div className={arrowClassName} />
      <div className="dropmenu__content">
        {options.map((option) => (
          <div
            className={classNames({
              dropmenu__option: true,
              dropmenu__option_active: selectedOption.id === option.id,
            })}
            onClick={() => {
              setSelectedOption(option)
              // eslint-disable-next-line no-unused-expressions
              option.handler?.()
            }}
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
