// @flow

import React from "react";
import classNames from "classnames";
import type { Props } from "./types";

export const Search = ({ customClassName = "" }: Props) => {
  const iconClassName = classNames(
    {
      icon: true
    },
    customClassName
  );
  return (
    <svg
      viewBox="0 0 16 16"
      stroke="none"
      xmlns="http://www.w3.org/2000/svg"
      className={iconClassName}
    >
      <path
        d="M6.5 11a4.5 4.5 0 100-9 4.5 4.5 0 000 9zM14 14l-4-4"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
};
