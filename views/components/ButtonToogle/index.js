// @flow

import React from "react";
import classNames from "classnames";
import type { Props } from "./types";

const ButtonToogle = ({
  checked = false,
  handleChange = () => {},
  className, disabled, bg
}: Props) => {
  const buttonToogleClassName = classNames("button-toogle", { "button-toogle_disabled": disabled, "button-toogle_bg_white": bg === "white" }, className);
  return (
    <label className={buttonToogleClassName}>
      <input
        type="checkbox"
        className="button-toogle__real"
        onChange={e => handleChange(e.target.checked)}
        checked={checked}
        disabled={disabled}
      />
      <div className="button-toogle__switch" />
      <div className="button-toogle__custom aic">
        <span className="button-toogle__text c3 aic">Buy</span>
        <span className="button-toogle__text c3 aic">Sell</span>
      </div>
    </label>
  );
};

export default ButtonToogle;
