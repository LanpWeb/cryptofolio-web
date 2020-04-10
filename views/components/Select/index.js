// @flow

import React, { useState } from "react";
import classNames from "classnames";
import type { Props } from "./types";

const initialOptions = [
  {
    name: "Bitcoin (BTC)",
    id: 1
  },
  {
    name: "BitMoney (BIT)",
    id: 2
  },
  {
    name: "BitRewards (BIT)",
    id: 3
  }
];
const Select = ({
  placeholder = "Select...",
  options = initialOptions,
  size
}: Props) => {
  const [isOpened, openDrop] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const selectClassName = classNames({
    select: true,
    select_lg: size === "lg",
    select_open: isOpened === true
  });

  const selectTitleClassName = classNames({
    "p3 select__title ": true,
    select__title_placeholder: selectedOption === null
  });

  return (
    <div
      className={selectClassName}
      onClick={() => openDrop(isOpened === false)}
    >
      <p className={selectTitleClassName}>
        {selectedOption === null ? placeholder : selectedOption.name}
      </p>
      <div className="select__arrow" />
      <div className="select__content">
        {options.map(option => (
          <div
            className="select__option"
            onClick={() => setSelectedOption(option)}
            key={option.id}
          >
            <p className="p3 select__text">{option.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Select;
