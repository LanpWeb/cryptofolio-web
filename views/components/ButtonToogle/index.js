// @flow

import React from "react";
import type { Props } from "./types";
import classNames from "classnames";

const ButtonToogle = ({
  checked = false,
  handleChange = () => {},
  className
}: Props) => {
  const buttonToogleClassName = classNames("button-toogle", className);
  return (
    <label className={buttonToogleClassName}>
      <input
        type="checkbox"
        className="button-toogle__real"
        onChange={e => handleChange(e.target.checked)}
        checked={checked}
      />
      <div className="button-toogle__switch"></div>
      <div className="button-toogle__custom aic">
        <span className="button-toogle__text c3 aic">Buy</span>
        <span className="button-toogle__text c3 aic">Sell</span>
      </div>
    </label>
  );
};

export default ButtonToogle;