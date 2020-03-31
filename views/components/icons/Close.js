// @flow

import React from "react";
import classNames from "classnames";
import type { Props } from "./types";

export const Close = ({ customClassName = "" }: Props) => {
  const iconClassName = classNames(
    {
      "icon-frame": true,
      customClassName
    },
    customClassName
  );
  return (
    <span className={iconClassName}>
      <svg
        width="10"
        height="10"
        stroke="none"
        xmlns="http://www.w3.org/2000/svg"
        className="icon"
      >
        <path
          d="M9 1L1 9M1 1l8 8"
          fill="none"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
};
