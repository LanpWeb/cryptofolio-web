// @flow

import React from "react";
import classNames from "classnames";
import type { Props } from "./types";

export const Refresh = ({ customClassName = "" }: Props) => {
  const iconClassName = classNames(
    {
      "icon-frame": true
    },
    customClassName
  );
  return (
    <>
      <span className={iconClassName}>
        <svg
          width="16"
          height="14"
          stroke="none"
          xmlns="http://www.w3.org/2000/svg"
          className="icon"
        >
          <path
            d="M.667 1.667v4h4M15.334 12.334v-4h-4"
            fill="none"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M13.66 5a6 6 0 00-9.9-2.24L.667 5.667m14.666 2.666L12.24 11.24A6 6 0 012.34 9"
            fill="none"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </>
  );
};
