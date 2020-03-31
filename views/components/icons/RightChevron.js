// @flow

import React from "react";
import classNames from "classnames";
import type { Props } from "./types";

export const RightChevron = ({ customClassName = "" }: Props) => {
  const iconClassName = classNames(
    {
      "icon-frame": true
    },
    customClassName
  );
  return (
    <span className={iconClassName}>
      <svg
        width="6"
        height="10"
        stroke="none"
        xmlns="http://www.w3.org/2000/svg"
        className="icon"
      >
        <path
          d="M1 1l4 4-4 4"
          fill="none"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
};
