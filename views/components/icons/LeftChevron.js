// @flow

import React from "react";
import classNames from "classnames";
import type { Props } from "./types";

export const LeftChevron = ({ customClassName = "" }: Props) => {
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
          d="M5 9L1 5l4-4"
          fill="none"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
};
