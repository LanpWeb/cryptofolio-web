// @flow

import React from "react";
import type { Props } from "./types";

const Button = ({ children, className, handleClick, icon }: Props) => {
  return (
    <button className="text-btn" onClick={handleClick}>
      {icon && <span className="icon-frame btn__icon">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
