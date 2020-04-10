// @flow

import React from "react";
import classNames from "classnames";
import type { Props } from "./types";

export const Close = ({ className = "" }: Props) => {
  const iconClassName = classNames(
    {
      "icon icon_hovered": true
    },
    className
  );
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="none"
      xmlns="http://www.w3.org/2000/svg"
      className={iconClassName}
    >
      <path
        d="M12 4l-8 8M4 4l8 8"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
