// @flow

import React from "react";
import classNames from "classnames";
import type { Props } from "./types";


const TextButton = ({
  children, className, handleClick, icon
}: Props) => {
  const textButtonClassName = classNames("text-btn ", className);
  return (
    <button className={textButtonClassName} onClick={handleClick}>
      {icon && <span className="icon-frame btn__icon">{icon}</span>}
      {children}
    </button>
  );
};

export default TextButton;
