// @flow

import React from "react";
import classNames from "classnames";
import type { Props } from "./types";

export const Search = ({ customClassName = "" }: Props) => {
  const iconClassName = classNames(
    {
      "icon-frame": true
    },
    customClassName
  );
  return (
    <span className={iconClassName}>
      <svg
        width="14"
        height="14"
        stroke="none"
        xmlns="http://www.w3.org/2000/svg"
        className="icon"
      >
        <path
          d="M5.5 10a4.5 4.5 0 100-9 4.5 4.5 0 000 9zM13 13L9 9"
          fill="none"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
};
