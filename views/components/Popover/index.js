// @flow

import React from "react";
import classNames from "classnames";
import type { Props } from "./types";

const Popover = ({
  content, active, className, size, position
}:Props) => {
  const popoverClassName = classNames({
    popover: true,
    popover_active: active,
    popover_md: size === "md",
    popover_lg: size === "lg",
    popover_right: position === "right",
    popover_left: position === "left"
  }, className);
  return (
    <div className={popoverClassName}>
      <div className="popover__triangle" />
      {content}
    </div>
  );
};

export default Popover;
